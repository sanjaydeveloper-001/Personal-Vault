import mongoose from 'mongoose';

const itemSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  type: {
    type: String,
    enum: ['note', 'link', 'file'],
    required: true,
  },
  title: {
    type: String,
    default: '',
  },
  content: {
    type: String,
    default: '',
  },
  metadata: {
    type: mongoose.Schema.Types.Mixed,
    default: {},
  },
  hasPassword: {
    type: Boolean,
    default: false,
  },
  passwordHash: {
    type: String,
    default: '',
  },
  deleted: {
    type: Boolean,
    default: false,
  },
}, { timestamps: true });

// Optional: text index for search
itemSchema.index({ title: 'text', content: 'text' });

const Item = mongoose.model('Item', itemSchema);
export default Item;