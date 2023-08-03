import { Request, Response, NextFunction, RequestHandler } from "express";
import httpStatus from "http-status";
import catchAsync from "../../../shared/catchAsync";
import cloudinary from "cloudinary";
import multer from "multer";

import {
  ILoginUserResponse,
  IRefreshTokenResponse,
  IRegisterUser,
} from "./auth.interface";
import sendResponse from "../../../shared/sendResponse";
import { AuthService } from "./auth.service";
import config from "../../../config";

//cloudinary image hosting

const cloudName = config.cloud_name;
const apiKey = config.api_key;
const apiSecret = config.api_sectret;

cloudinary.v2.config({
  cloud_name: cloudName,
  api_key: apiKey,
  api_secret: apiSecret,
});
const upload = multer({ dest: "uploads/" });

const registerUser: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const { userName, password, email }: IRegisterUser = req.body;

    let imageUrl;

    if (req.file) {
      try {
        const result = await cloudinary.v2.uploader.upload(req.file.path);
        imageUrl = result.secure_url;
      } catch (error) {
        console.error("Error uploading image to Cloudinary:", error);
      }
    }

    const result = await AuthService.registerUser({
      userName,
      password,
      email,
      imageUrl,
    });

    sendResponse<IRegisterUser>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "user created successfully!",
      data: result,
    });
  }
);

const loginUser = catchAsync(async (req: Request, res: Response) => {
  const { ...loginData } = req.body;
  const result = await AuthService.loginUser(loginData);
  const { refreshToken, ...others } = result;

  // set refresh token into cookie
  const cookieOptions = {
    secure: config.env === "production",
    httpOnly: true,
  };

  res.cookie("refreshToken", refreshToken, cookieOptions);

  sendResponse<ILoginUserResponse>(res, {
    statusCode: 200,
    success: true,
    message: "User logged in successfully !",
    data: others,
  });
});

const refreshToken = catchAsync(async (req: Request, res: Response) => {
  const { refreshToken } = req.cookies;

  const result = await AuthService.refreshToken(refreshToken);

  // set refresh token into cookie
  const cookieOptions = {
    secure: config.env === "production",
    httpOnly: true,
  };

  res.cookie("refreshToken", refreshToken, cookieOptions);

  sendResponse<IRefreshTokenResponse>(res, {
    statusCode: 200,
    success: true,
    message: "User logged in successfully !",
    data: result,
  });
});

const changePassword = catchAsync(async (req: Request, res: Response) => {
  const user = req.user;
  const { ...passwordData } = req.body;

  await AuthService.changePassword(user, passwordData);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Password changed successfully !",
  });
});

const logout = async (req: Request, res: Response) => {
  res.clearCookie("accessToken", {
    sameSite: "none",
    secure: true,
  });

  sendResponse<ILoginUserResponse>(res, {
    statusCode: 200,
    success: true,
    message: "User has been logged out.",
  });
};

export const AuthController = {
  registerUser,
  loginUser,
  refreshToken,
  changePassword,
  logout,
};
