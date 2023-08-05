// controllers/ImageController.ts
import { Request, Response } from "express";
import cloudinary from "cloudinary";
import config from "../../../config";
import multer from "multer";
import * as path from "path";

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

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 1 * 1024 * 1024 }, // 1MB file size limit
  fileFilter: (req, file, callback) => {
    const acceptableExtensions = ["png", "jpg", "jpeg"];
    if (
      acceptableExtensions.some(
        (extension) =>
          path.extname(file.originalname).toLowerCase() === `.${extension}`
      )
    ) {
      callback(null, true); // Accept the file
    } else {
      callback(
        new Error(
          `Extension not allowed, accepted extensions are ${acceptableExtensions.join(
            ","
          )}`
        )
      );
    }
  },
}).single("image"); // Change "image" to match your form field name

const processImage = async (req: Request, res: Response) => {
  try {
    upload(req, res, async (err) => {
      if (err) {
        console.error("Error uploading image:", err);
        return res.status(500).json({ error: "Image upload failed" });
      }

      console.log("req.file before pipe:", req.file);
      if (!req.file) {
        return res.status(400).json({ error: "No file uploaded" });
      }

      const stream = cloudinary.v2.uploader.upload_stream((error, result) => {
        if (error) {
          console.error("Error uploading image to Cloudinary:", error);
          return res
            .status(500)
            .json({ error: "Image upload to Cloudinary failed" });
        }

        if (result) {
          const imageUrl = result.secure_url;
          return res.status(201).json({ imageUrl });
        } else {
          return res.status(500).json({ error: "Image upload failed" });
        }
      });

      if (req.file.stream) {
        req.file.stream.pipe(stream);
      } else {
        return res.status(500).json({ error: "Image upload failed" });
      }
    });
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({ error: "Image upload failed" });
  }
};

export const UploadController = {
  processImage,
};
