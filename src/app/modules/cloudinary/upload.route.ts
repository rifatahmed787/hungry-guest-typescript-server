// routes/imageRoutes.ts
import express from "express";

import { UploadController } from "./upload.controller";
import multer from "multer";

const router = express.Router();
const storage = multer.memoryStorage();
const upload = multer({ storage });

router.post(
  "/imageupload",

  UploadController.processImage
);

export const UploadRoute = router;
