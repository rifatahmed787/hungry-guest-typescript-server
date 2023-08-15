"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
const DEFAULT_ALLOWED_FILE_TYPES = ["image/jpeg", "image/png", "image/jpg"];
const DEFAULT_MAX_FILE_SIZE = 1024 * 1024 * 5; // 5MB
const uploader = ({ allowedFileTypes = DEFAULT_ALLOWED_FILE_TYPES, errorMessage = "Invalid file type", maxFileSize = DEFAULT_MAX_FILE_SIZE, }) => {
    const storage = multer_1.default.diskStorage({
        filename: (req, file, cb) => {
            const fileExt = path_1.default.extname(file.originalname);
            const fileName = `${file.originalname
                .replace(fileExt, "")
                .toLowerCase()
                .split(" ")
                .join("-")}-${Date.now()}`;
            cb(null, fileName + fileExt);
        },
    });
    const fileFilter = (req, file, cb) => {
        if (allowedFileTypes.includes(file.mimetype)) {
            cb(null, true);
        }
        else {
            cb(new Error(errorMessage));
        }
    };
    const upload = (0, multer_1.default)({
        storage,
        fileFilter,
        limits: {
            fileSize: maxFileSize,
        },
    });
    return upload;
};
exports.default = uploader;
