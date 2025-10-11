import { v2 as cloudinary } from 'cloudinary';
import fs from "fs";
import path from "path";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const uploadFile = async (file, folder) => {
  try {
    if (!file?.path) {
      throw new Error("Missing file path");
    }

    const absolutePath = path.resolve(file.path);
    if (!fs.existsSync(absolutePath)) {
      throw new Error(`File not found: ${absolutePath}`);
    }

    const result = await cloudinary.uploader.upload(absolutePath, {
      resource_type: "auto",
      folder: folder || undefined,
    });

    fs.unlinkSync(absolutePath);
    return result.secure_url;
  } catch (err) {
    console.error("Cloudinary upload error:", err);
    throw {
      message: err.message || "Upload failed",
      http_code: err.http_code || 500,
    };
  }
};
