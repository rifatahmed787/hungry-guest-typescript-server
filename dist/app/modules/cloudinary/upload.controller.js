"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UploadController = void 0;
const cloudinary_1 = require("cloudinary");
const config_1 = __importDefault(require("../../../config"));
const http_status_1 = __importDefault(require("http-status"));
//cloudinary image hosting
const cloudName = config_1.default.cloud_name;
const apiKey = config_1.default.api_key;
const apiSecret = config_1.default.api_secret;
console.log(cloudName, apiKey, apiSecret);
cloudinary_1.v2.config({
    cloud_name: cloudName,
    api_key: apiKey,
    api_secret: apiSecret,
});
const uploadFileController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const files = req.files;
        console.log("Is Object", files);
        const uploadedImages = yield Promise.all(files.map((file) => __awaiter(void 0, void 0, void 0, function* () {
            console.log(file);
            const result = yield cloudinary_1.v2.uploader.upload(file.path, (error, result) => {
                if (error) {
                    console.log(error);
                    return res.send(error);
                }
            });
            return result.secure_url;
        })));
        res.status(200).json({
            statusCode: http_status_1.default.OK,
            status: true,
            message: "File uploaded successfully",
            images: uploadedImages,
        });
    }
    catch (error) {
        // next(error);
        res.status(500).json({ status: false, message: "Internal Server Error" });
    }
});
exports.UploadController = {
    uploadFileController,
};
