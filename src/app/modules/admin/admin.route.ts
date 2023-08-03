import express from "express";
import { ENUM_USER_ROLE } from "../../../enums/user";
import validateRequest from "../../Middlewares/validateRequest";
import { AdminController } from "./admin.controller";
import { AdminValidation } from "./admin.validation";
import auth from "../../Middlewares/auth";
const router = express.Router();

router.get(
  "/:id",
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.ADMIN),
  AdminController.getSingleAdmin
);
router.get(
  "/",
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.ADMIN),
  AdminController.getAllAdmins
);

router.patch(
  "/:id",
  validateRequest(AdminValidation.updateAdmin),
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.ADMIN),
  AdminController.updateAdmin
);

router.delete("/:id", auth(ENUM_USER_ROLE.ADMIN), AdminController.deleteAdmin);

export const AdminRoutes = router;
