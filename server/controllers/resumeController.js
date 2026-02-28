import Resume from '../models/Resume.js';
import multer from 'multer';
import crypto from 'crypto';

const upload = multer({
  limits: { fileSize: 15 * 1024 * 1024 }, // 15MB
}).single('resume');

export const getResumes = async (req, res) => {
  let resumes = await Resume.find({ user: req.user._id }).sort('position');

  const result = [];
  for (let i = 1; i <= 3; i++) {
    let slot = resumes.find(r => r.position === i);
    if (!slot) {
      const token = crypto.randomBytes(16).toString('hex');
      slot = await Resume.create({
        user: req.user._id,
        position: i,
        publicToken: token,
        file: null,
      });
    }
    result.push({
      position: slot.position,
      publicToken: slot.publicToken,
      file: slot.file ? {
        originalName: slot.file.originalName,
        size: slot.file.size,
        contentType: slot.file.contentType,
      } : null,
    });
  }
  res.json(result);
};

export const uploadResume = (req, res) => {
  upload(req, res, async (err) => {
    if (err) {
      if (err instanceof multer.MulterError && err.code === 'LIMIT_FILE_SIZE') {
        return res.status(400).json({ message: 'File too large. Max 15MB.' });
      }
      return res.status(400).json({ message: err.message });
    }

    const { position } = req.body;
    const file = req.file;

    if (!position || position < 1 || position > 3) {
      return res.status(400).json({ message: 'Position must be 1, 2, or 3' });
    }
    if (!file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    const fileMetadata = {
      data: file.buffer,
      contentType: file.mimetype,
      originalName: file.originalname,
      size: file.size,
    };

    try {
      let resume = await Resume.findOne({ user: req.user._id, position });
      if (!resume) {
        const token = crypto.randomBytes(16).toString('hex');
        resume = new Resume({
          user: req.user._id,
          position,
          publicToken: token,
          file: fileMetadata,
        });
      } else {
        resume.file = fileMetadata;
      }
      await resume.save();

      res.json({
        position: resume.position,
        publicToken: resume.publicToken,
        file: {
          originalName: resume.file.originalName,
          size: resume.file.size,
          contentType: resume.file.contentType,
        },
      });
    } catch (error) {
      res.status(500).json({ message: 'Database error' });
    }
  });
};

export const deleteResume = async (req, res) => {
  const position = parseInt(req.params.position);
  const resume = await Resume.findOne({ user: req.user._id, position });
  if (!resume) {
    return res.status(404).json({ message: 'Resume slot not found' });
  }
  resume.file = null;
  await resume.save();
  res.json({ message: 'Resume file removed' }); 
};

export const getPublicResume = async (req, res) => {
  const { token } = req.params;
  const resume = await Resume.findOne({ publicToken: token });
  if (!resume) {
    return res.status(404).json({ message: 'Resume not found' });
  }
  if (!resume.file || !resume.file.data) {
    return res.status(404).json({ message: 'No file uploaded for this slot' });
  }

  res.set('Content-Type', resume.file.contentType);
  res.set('Content-Disposition', `inline; filename="${resume.file.originalName}"`);
  res.set('Content-Length', resume.file.size);
  res.send(resume.file.data);
};