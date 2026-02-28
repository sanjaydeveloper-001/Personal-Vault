import User from '../models/user.js';
import Resume from '../models/Resume.js'; 
import crypto from 'crypto'; 
import jwt from 'jsonwebtoken';

// Generate JWT
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  });
};

export const registerUser = async (req, res) => {
  const { username, password } = req.body;

  const userExists = await User.findOne({ username });
  if (userExists) {
    return res.status(400).json({ message: 'Username already taken' });
  }

  const user = await User.create({ username, password });

  if (user) {
    const positions = [1, 2, 3];
    const resumePromises = positions.map(async (pos) => {
      const publicToken = crypto.randomBytes(16).toString('hex');
      return Resume.create({
        user: user._id,
        position: pos,
        publicToken,
        file: null,
      });
    });

    try {
      await Promise.all(resumePromises); 
    } catch (error) {
      console.error('Failed to create resume slots:', error);
    }

    const token = generateToken(user._id);
    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
      maxAge: 30 * 24 * 60 * 60 * 1000,
    });

    res.status(201).json({
      _id: user._id,
      username: user.username,
    });
  } else {
    res.status(400).json({ message: 'Invalid user data' });
  }
};

export const loginUser = async (req, res) => {
  const { username, password } = req.body;

  const user = await User.findOne({ username });
  if (user && (await user.matchPassword(password))) {
    const token = generateToken(user._id);
    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'None',
      maxAge: 30 * 24 * 60 * 60 * 1000,
    });

    res.json({
      _id: user._id,
      username: user.username,
    });
  } else {
    res.status(401).json({ message: 'Invalid username or password' });
  }
};

export const logoutUser = (req, res) => {
  res.cookie('token', '', {
    httpOnly: true,
    expires: new Date(0),
  });
  res.status(200).json({ message: 'Logged out successfully' });
};

export const getProfile = (req, res) => {
  res.json(req.user);
};

export const updateUsername = async (req, res) => {
  const { newUsername } = req.body;
  if (!newUsername) {
    return res.status(400).json({ message: 'New username is required' });
  }

  const existingUser = await User.findOne({ username: newUsername });
  if (existingUser) {
    return res.status(400).json({ message: 'Username already taken' });
  }

  const user = req.user;
  user.username = newUsername;
  await user.save();

  res.json({ 
    message: 'Username updated successfully',
    username: user.username 
  });
};