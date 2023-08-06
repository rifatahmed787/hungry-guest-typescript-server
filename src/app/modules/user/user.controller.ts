import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import { UserService } from "./user.service";
import sendResponse from "../../../shared/sendResponse";
import { IUser } from "../auth/auth.model";
import httpStatus from "http-status";

const getSingleUser = catchAsync(async (req: Request, res: Response) => {
  const email = req.params.email;
  const result = await UserService.getUserByEmail(email);

  sendResponse<IUser>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User fetched successfully",
    data: result,
  });
});

const getAllUsers = catchAsync(async (req: Request, res: Response) => {
  const result = await UserService.getAllUsers();

  sendResponse<IUser[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User get successfully",
    data: result,
  });
});

export const UserController = {
  getSingleUser,
  getAllUsers,
};
