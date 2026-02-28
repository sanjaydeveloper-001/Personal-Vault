import User from '../models/user.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

// Helper to hash answers
const hashAnswer = async (answer) => {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(answer, salt);
};
 
// @desc    Set security questions answers for logged-in user
// @route   POST /api/auth/security-questions
// @access  Private
export const setSecurityQuestions = async (req, res) => {
  const { birthYear, placeAnswer, friendAnswer } = req.body;
  const user = await User.findById(req.user._id);

  if (birthYear !== undefined) {
    // Validate year range
    if (birthYear && (birthYear < 1900 || birthYear > new Date().getFullYear())) {
      return res.status(400).json({ message: 'Invalid birth year' });
    }
    user.birthYear = birthYear;
  }

  if (placeAnswer) {
    user.placeAnswerHash = await hashAnswer(placeAnswer);
  }
  if (friendAnswer) {
    user.friendAnswerHash = await hashAnswer(friendAnswer);
  }

  await user.save();
  res.json({ message: 'Security questions updated' });
};

// @desc    Initiate forgot password – verify username and return available fixed questions (place & friend)
// @route   POST /api/auth/forgot-password/init
// @access  Public
export const initForgotPassword = async (req, res) => {
  const { username } = req.body;
  const user = await User.findOne({ username });
  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }

  // Fixed questions – only include those that have been set
  const questions = [];
  if (user.placeAnswerHash) {
    questions.push({ id: 'place', question: 'What is your favorite place in your country?' });
  }
  if (user.friendAnswerHash) {
    questions.push({ id: 'friend', question: 'What is your best friend\'s name?' });
  }

  if (questions.length === 0) {
    return res.status(400).json({ message: 'No security questions set for this user.' });
  }

  res.json({ userId: user._id, questions });
};

// @desc    Verify answer and issue reset token
// @route   POST /api/auth/forgot-password/verify
// @access  Public
export const verifyAnswer = async (req, res) => {
  const { userId, questionId, answer } = req.body;
  const user = await User.findById(userId);
  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }

  let isMatch = false;
  if (questionId === 'place' && user.placeAnswerHash) {
    isMatch = await bcrypt.compare(answer, user.placeAnswerHash);
  } else if (questionId === 'friend' && user.friendAnswerHash) {
    isMatch = await bcrypt.compare(answer, user.friendAnswerHash);
  } else {
    return res.status(400).json({ message: 'Invalid question' });
  }

  if (!isMatch) {
    return res.status(401).json({ message: 'Incorrect answer' });
  }

  // Create a short-lived JWT for password reset
  const resetToken = jwt.sign(
    { userId: user._id, purpose: 'reset' },
    process.env.JWT_SECRET,
    { expiresIn: '15m' }
  );

  res.json({ resetToken });
};

// @desc    Reset password using token
// @route   POST /api/auth/reset-password
// @access  Public
export const resetPassword = async (req, res) => {
  const { resetToken, newPassword } = req.body;

  try {
    const decoded = jwt.verify(resetToken, process.env.JWT_SECRET);
    if (decoded.purpose !== 'reset') {
      return res.status(401).json({ message: 'Invalid token' });
    }

    const user = await User.findById(decoded.userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    user.password = newPassword; // Will be hashed by pre-save hook
    await user.save();

    res.json({ message: 'Password updated successfully' });
  } catch (error) {
    return res.status(401).json({ message: 'Token expired or invalid' });
  }
};