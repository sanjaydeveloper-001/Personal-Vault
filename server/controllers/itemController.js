import Item from '../models/item.js';
import cloudinary from '../utils/cloudinary.js';
import bcrypt from 'bcryptjs'; 

const hashItemPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
};

export const getTrashItems = async (req, res) => {
  const items = await Item.find({ user: req.user._id, deleted: true }).select('-passwordHash');
  res.json(items);
};

export const getItems = async (req, res) => {
  const items = await Item.find({ user: req.user._id, deleted: false }).select('-passwordHash');
  res.json(items);
};

export const createItem = async (req, res) => {
  const { type, title, content, metadata, password } = req.body;

  if (!type) {
    return res.status(400).json({ message: 'Type is required' });
  }

  const itemData = {
    user: req.user._id,
    type,
    title: title || '',
    content: content || '',
    metadata: metadata || {},
    hasPassword: false,
    passwordHash: '',
  };

  if (password) {
    itemData.hasPassword = true;
    itemData.passwordHash = await hashItemPassword(password);
  }

  const item = await Item.create(itemData);
  const { passwordHash, ...itemWithoutHash } = item.toObject();
  res.status(201).json(itemWithoutHash);
};

export const getItemById = async (req, res) => {
  const item = await Item.findOne({ _id: req.params.id, user: req.user._id });
  if (!item) {
    return res.status(404).json({ message: 'Item not found' });
  }

  if (item.hasPassword) {
    return res.json({
      _id: item._id,
      type: item.type,
      title: item.title,
      hasPassword: true,
    });
  }

  const { passwordHash, ...itemWithoutHash } = item.toObject();
  res.json(itemWithoutHash);
};

export const verifyItemPassword = async (req, res) => {
  const { password } = req.body;
  if (!password) {
    return res.status(400).json({ message: 'Password is required' });
  }

  const item = await Item.findOne({ _id: req.params.id, user: req.user._id });
  if (!item) {
    return res.status(404).json({ message: 'Item not found' });
  }

  if (!item.hasPassword) {
    return res.status(400).json({ message: 'Item is not password protected' });
  }

  const isMatch = await bcrypt.compare(password, item.passwordHash);
  if (!isMatch) {
    return res.status(401).json({ message: 'Incorrect password' });
  }

  const { passwordHash, ...itemWithoutHash } = item.toObject();
  res.json(itemWithoutHash);
};

export const updateItem = async (req, res) => {
  const item = await Item.findOne({ _id: req.params.id, user: req.user._id });
  if (!item) {
    return res.status(404).json({ message: 'Item not found' });
  }

  const { title, content, metadata, password } = req.body;

  if (title !== undefined) item.title = title;
  if (content !== undefined) item.content = content;
  if (metadata !== undefined) item.metadata = metadata;

  if (password !== undefined) {
    if (password === '') {
      item.hasPassword = false;
      item.passwordHash = '';
    } else {
      item.hasPassword = true;
      item.passwordHash = await hashItemPassword(password);
    }
  } 

  await item.save();

  const { passwordHash, ...itemWithoutHash } = item.toObject();
  res.json(itemWithoutHash);
};

export const deleteItem = async (req, res) => {
  const item = await Item.findOne({ _id: req.params.id, user: req.user._id });
  if (!item) {
    return res.status(404).json({ message: 'Item not found' });
  }
  item.deleted = true;
  await item.save();
  res.json({ message: 'Item moved to trash' });
};

export const restoreItem = async (req, res) => {
  const item = await Item.findOne({ _id: req.params.id, user: req.user._id, deleted: true });
  if (!item) {
    return res.status(404).json({ message: 'Item not found in trash' });
  }
  item.deleted = false;
  await item.save();
  res.json({ message: 'Item restored' });
};

export const permanentDeleteItem = async (req, res) => {
  const item = await Item.findOne({ _id: req.params.id, user: req.user._id, deleted: true });
  if (!item) {
    return res.status(404).json({ message: 'Item not found in trash' });
  }

  if (item.type === 'file' && item.metadata?.public_id) {
    try {
      await cloudinary.uploader.destroy(item.metadata.public_id);
    } catch (error) {
      console.error('Cloudinary deletion error:', error);
    }
  }

  await item.deleteOne(); 
  res.json({ message: 'Item permanently deleted' });
};

// @desc    Permanently delete all items in trash
// @route   DELETE /api/items/trash/empty
// @access  Private
export const emptyTrash = async (req, res) => {
  const items = await Item.find({ user: req.user._id, deleted: true });

  if (items.length === 0) {
    return res.status(404).json({ message: 'Trash is already empty' });
  }

  // For each file-type item, delete from Cloudinary
  const deletePromises = items.map(async (item) => {
    if (item.type === 'file' && item.metadata?.public_id) {
      try {
        await cloudinary.uploader.destroy(item.metadata.public_id);
      } catch (error) {
        console.error(`Cloudinary deletion error for ${item.metadata.public_id}:`, error);
        // Continue with DB deletion even if Cloudinary fails
      }
    }
    return item.deleteOne();
  });

  await Promise.all(deletePromises);
  res.json({ message: 'Trash emptied successfully' });
};