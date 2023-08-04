// controllers/ImageController.ts
import { Request, Response } from "express";
import cloudinary from "cloudinary";
import config from "../../../config";
import multer from "multer";

//cloudinary image hosting

const cloudName = config.cloud_name;
const apiKey = config.api_key;
const apiSecret = config.api_sectret;
console.log(cloudName, apiKey, apiSecret);

cloudinary.v2.config({
  cloud_name: cloudName,
  api_key: apiKey,
  api_secret: apiSecret,
} as any);

const storage = multer.memoryStorage(); // Store the uploaded image in memory
const upload = multer({
  storage,
  limits: { fileSize: 1 * 1024 * 1024 }, // 1MB file size limit
});

const processImage = async (req: Request, res: Response) => {
  try {
    console.log("req.file before pipe:", req.file);
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    const stream = cloudinary.v2.uploader.upload_stream((error, result) => {
      if (error) {
        console.error("Error uploading image to Cloudinary:", error);
        return res.status(500).json({ error: "Image upload failed" });
      }

      if (result) {
        const imageUrl = result.secure_url;
        return res.status(201).json({ imageUrl });
      } else {
        return res.status(500).json({ error: "Image upload failed" });
      }
    });

    req.file.stream.pipe(stream); // Pipe the buffer directly to Cloudinary
  } catch (error) {
    console.error("Error uploading image:", error);
    return res.status(500).json({ error: "Image upload failed" });
  }
};

export const UploadController = {
  processImage,
};
