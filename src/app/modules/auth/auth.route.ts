import express from "express";
import { AuthController } from "./auth.controller";

import { AuthValidation } from "./auth.validation";
import validateRequest from "../../Middlewares/validateRequest";

const router = express.Router();

router.post("/register", AuthController.registerUser);

router.post(
  "/login",
  validateRequest(AuthValidation.loginZodSchema),
  AuthController.loginUser
);

router.post(
  "/refresh-token",
  validateRequest(AuthValidation.refreshTokenZodSchema),
  AuthController.refreshToken
);

router.post(
  "/change-password",
  validateRequest(AuthValidation.changePasswordZodSchema),
  AuthController.changePassword
);

router.post("/logout", AuthController.logout);

export const AuthRoutes = router;
