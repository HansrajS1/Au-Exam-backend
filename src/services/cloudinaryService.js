import cloudinary from '../config/cloudinary.js';

export const uploadFile = async (filePath, folder) => {
  const result = await cloudinary.uploader.upload(filePath, { folder });
  return result.secure_url;
};
