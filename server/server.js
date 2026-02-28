import './config/env.js';
import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import connectDB from './config/db.js';
import { errorHandler } from './middleware/errorMiddleware.js';


// Connect to database
connectDB();

const app = express();

// Body parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Cookie parser
app.use(cookieParser());

// CORS
app.use(
  cors({
    origin: "https://vaultnotesclient.vercel.app",
    credentials: true,
  })
);

// Routes
import authRoutes from './routes/auth.js';
import itemsRoutes from './routes/items.js';
import uploadRoutes from './routes/upload.js';
import resumeRoutes from './routes/resume.js';

app.use('/api/auth', authRoutes);
app.use('/api/items', itemsRoutes);
app.use('/api/upload', uploadRoutes);
app.use('/api/resumes', resumeRoutes);

// Base route
app.get('/', (req, res) => {
  res.send('VaultNotes API is running...');
});

// Error handling middleware
app.use(errorHandler);

// Start server (local development)
if (process.env.NODE_ENV !== 'production') {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}

// Export for Vercel serverless
export default app;    