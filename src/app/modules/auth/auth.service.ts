import bcrypt from "bcrypt";
import {
  IChangePassword,
  ILoginUser,
  ILoginUserResponse,
  IRefreshTokenResponse,
  IRegisterUser,
} from "./auth.interface";
import User from "./auth.model";
import ApiError from "../../../errors/ApiError";
import httpStatus from "http-status";
import { jwtHelpers } from "../../../helpers/jwtHelpers";
import { JwtPayload, Secret } from "jsonwebtoken";
import config from "../../../config";

const registerUser = async (
  user: IRegisterUser
): Promise<IRegisterUser | null> => {
  const { userName, password, email } = user;

  // Check if the required fields are provided
  if (!userName) {
    throw new Error("Username is required.");
  } else if (!email) {
    throw new Error("Email is required.");
  } else if (!password) {
    throw new Error("Password is required.");
  }

  // Check if the user already exists
  const existingUser = await User.findOne({ userName });
  if (existingUser) {
    throw new Error("Username already exists.");
  }

  // Hash the password
  const hash = bcrypt.hashSync(password, 5);

  // Create a new user
  const newUser = new User({
    userName,
    password: hash,
    email,
  });

  // Save the user to the database
  await newUser.save();

  return newUser;
};

const loginUser = async (payload: ILoginUser): Promise<ILoginUserResponse> => {
  const { email, password } = payload;

  const isUserExist = await User.isUserExist(email);

  if (!isUserExist) {
    throw new ApiError(httpStatus.NOT_FOUND, "User does not exist");
  }

  if (
    isUserExist.password &&
    !(await User.isPasswordMatched(password, isUserExist.password))
  ) {
    throw new ApiError(httpStatus.UNAUTHORIZED, "Password is incorrect");
  }

  // Create access token & refresh token
  const { email: userExistEmail, password: userExistPassword } = isUserExist;

  const accessToken = jwtHelpers.createToken(
    { email: userExistEmail, password: userExistPassword },
    config.jwt.secret as Secret,
    config.jwt.expires_in as string
  );

  const refreshToken = jwtHelpers.createToken(
    { email: userExistEmail, password: userExistPassword },
    config.jwt.refresh_secret as Secret,
    config.jwt.refresh_expires_in as string
  );

  return {
    accessToken,
    refreshToken,
  };
};

const refreshToken = async (token: string): Promise<IRefreshTokenResponse> => {
  //verify token
  // invalid token - synchronous
  let verifiedToken = null;
  try {
    verifiedToken = jwtHelpers.verifyToken(
      token,
      config.jwt.refresh_secret as Secret
    );
  } catch (err) {
    throw new ApiError(httpStatus.FORBIDDEN, "Invalid Refresh Token");
  }

  const { userId } = verifiedToken;

  // tumi delete hye gso  kintu tumar refresh token ase
  // checking deleted user's refresh token

  const isUserExist = await User.isUserExist(userId);
  if (!isUserExist) {
    throw new ApiError(httpStatus.NOT_FOUND, "User does not exist");
  }
  //generate new token

  const newAccessToken = jwtHelpers.createToken(
    {
      email: isUserExist.email,
      password: isUserExist.password,
    },
    config.jwt.secret as Secret,
    config.jwt.expires_in as string
  );

  return {
    accessToken: newAccessToken,
  };
};

const changePassword = async (
  user: JwtPayload | null,
  payload: IChangePassword
): Promise<void> => {
  const { oldPassword, newPassword } = payload;

  const isUserExist = await User.findOne({ id: user?.userId }).select(
    "+password"
  );

  if (!isUserExist) {
    throw new ApiError(httpStatus.NOT_FOUND, "User does not exist");
  }

  // checking old password
  const isPasswordMatched = await bcrypt.compare(
    oldPassword,
    isUserExist.password
  );
  if (!isPasswordMatched) {
    throw new ApiError(httpStatus.UNAUTHORIZED, "Old Password is incorrect");
  }

  const hashedNewPassword = await bcrypt.hash(newPassword, 5);
  isUserExist.password = hashedNewPassword;

  // updating using save()
  await isUserExist.save();
};

export const AuthService = {
  registerUser,
  loginUser,
  refreshToken,
  changePassword,
};
