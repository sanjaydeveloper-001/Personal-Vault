import mongoose from 'mongoose';

const resumeSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  position: {
    type: Number,
    min: 1,
    max: 3,
    required: true,
  },
  publicToken: {
    type: String,
    required: true,
    unique: true, // each slot has a globally unique token
  },
  file: {
    data: Buffer,
    contentType: String,
    originalName: String,
    size: Number,
    // all optional – null if no file
  },
}, { timestamps: true });

// Ensure one slot per user per position
resumeSchema.index({ user: 1, position: 1 }, { unique: true });

const Resume = mongoose.model('Resume', resumeSchema);
export default Resume;