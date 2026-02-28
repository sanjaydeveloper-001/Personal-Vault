import cloudinary from '../utils/cloudinary.js';

export const getUploadSignature = (req, res) => {
  const timestamp = Math.round(new Date().getTime() / 1000);
  const folder = 'personalVault';

  const signature = cloudinary.utils.api_sign_request(
    {
      timestamp,
      folder,
    },
    process.env.CLOUDINARY_API_SECRET
  );

  res.json({
    timestamp,
    signature,
    apiKey: process.env.CLOUDINARY_API_KEY,
    cloudName: process.env.CLOUDINARY_CLOUD_NAME,
    folder,
  });
};