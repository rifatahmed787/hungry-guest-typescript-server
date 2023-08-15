"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UploadRoute = void 0;
// routes/imageRoutes.ts
const express_1 = __importDefault(require("express"));
const upload_controller_1 = require("./upload.controller");
const fileUploadMiddleware_1 = __importDefault(require("./fileUploadMiddleware"));
const router = express_1.default.Router();
router.post("/imageupload", fileUploadMiddleware_1.default, upload_controller_1.UploadController.uploadFileController);
exports.UploadRoute = router;
