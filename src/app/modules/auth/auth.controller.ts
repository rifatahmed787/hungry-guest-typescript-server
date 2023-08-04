import { Request, Response, NextFunction, RequestHandler } from "express";
import httpStatus from "http-status";
import catchAsync from "../../../shared/catchAsync";

import {
  ILoginUserResponse,
  IRefreshTokenResponse,
  IRegisterUser,
} from "./auth.interface";
import sendResponse from "../../../shared/sendResponse";
import { AuthService } from "./auth.service";
import config from "../../../config";

//register function start from here

const registerUser: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const { userName, password, email, imageUrl }: IRegisterUser = req.body;
    console.log(userName, password, email, imageUrl);

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

//login user is starting from here

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

//refresh token is starting from here

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

//change password is starting from here

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
