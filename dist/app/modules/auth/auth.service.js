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
exports.AuthService = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const auth_model_1 = __importDefault(require("./auth.model"));
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const http_status_1 = __importDefault(require("http-status"));
const jwtHelpers_1 = require("../../../helpers/jwtHelpers");
const config_1 = __importDefault(require("../../../config"));
const registerUser = (user) => __awaiter(void 0, void 0, void 0, function* () {
    const { userName, password, email, imageUrl } = user;
    // Check if the required fields are provided
    if (!userName) {
        throw new Error("Username is required.");
    }
    else if (!email) {
        throw new Error("Email is required.");
    }
    else if (!password) {
        throw new Error("Password is required.");
    }
    else if (!imageUrl) {
        throw new Error("ImageUrl is required.");
    }
    // Check if the user already exists
    const existingUser = yield auth_model_1.default.findOne({ email });
    if (existingUser) {
        throw new Error("Email already exists.");
    }
    // Hash the password
    const hash = bcrypt_1.default.hashSync(password, 5);
    // Create a new user
    const newUser = new auth_model_1.default({
        userName,
        password: hash,
        email,
        imageUrl,
    });
    // Save the user to the database
    yield newUser.save();
    return newUser.toObject();
});
const loginUser = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = payload;
    const isUserExist = yield auth_model_1.default.isUserExist(email);
    if (!isUserExist) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, "User does not exist");
    }
    if (isUserExist.password &&
        !(yield auth_model_1.default.isPasswordMatched(password, isUserExist.password))) {
        throw new ApiError_1.default(http_status_1.default.UNAUTHORIZED, "Password is incorrect");
    }
    // Create access token & refresh token
    const { email: userExistEmail, password: userExistPassword } = isUserExist;
    const accessToken = jwtHelpers_1.jwtHelpers.createToken({ email: userExistEmail, password: userExistPassword }, config_1.default.jwt.secret, config_1.default.jwt.expires_in);
    // console.log("the access token is==", accessToken);
    const refreshToken = jwtHelpers_1.jwtHelpers.createToken({ email: userExistEmail, password: userExistPassword }, config_1.default.jwt.refresh_secret, config_1.default.jwt.refresh_expires_in);
    // console.log("the refresh token is==", refreshToken);
    return {
        accessToken,
        refreshToken,
        email,
    };
});
const refreshToken = (token) => __awaiter(void 0, void 0, void 0, function* () {
    //verify token
    // invalid token - synchronous
    let verifiedToken = null;
    try {
        verifiedToken = jwtHelpers_1.jwtHelpers.verifyToken(token, config_1.default.jwt.refresh_secret);
    }
    catch (err) {
        throw new ApiError_1.default(http_status_1.default.FORBIDDEN, "Invalid Refresh Token");
    }
    const { userId } = verifiedToken;
    // tumi delete hye gso  kintu tumar refresh token ase
    // checking deleted user's refresh token
    const isUserExist = yield auth_model_1.default.isUserExist(userId);
    if (!isUserExist) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, "User does not exist");
    }
    //generate new token
    const newAccessToken = jwtHelpers_1.jwtHelpers.createToken({
        email: isUserExist.email,
        password: isUserExist.password,
    }, config_1.default.jwt.secret, config_1.default.jwt.expires_in);
    return {
        accessToken: newAccessToken,
    };
});
const changePassword = (user, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { oldPassword, newPassword } = payload;
    const isUserExist = yield auth_model_1.default.findOne({ id: user === null || user === void 0 ? void 0 : user.userId }).select("+password");
    if (!isUserExist) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, "User does not exist");
    }
    // checking old password
    const isPasswordMatched = yield bcrypt_1.default.compare(oldPassword, isUserExist.password);
    if (!isPasswordMatched) {
        throw new ApiError_1.default(http_status_1.default.UNAUTHORIZED, "Old Password is incorrect");
    }
    const hashedNewPassword = yield bcrypt_1.default.hash(newPassword, 5);
    isUserExist.password = hashedNewPassword;
    // updating using save()
    yield isUserExist.save();
});
exports.AuthService = {
    registerUser,
    loginUser,
    refreshToken,
    changePassword,
};
