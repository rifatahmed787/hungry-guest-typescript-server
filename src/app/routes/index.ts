import express from "express";
import { AuthRoutes } from "../modules/auth/auth.route";
import { BlogRoutes } from "../modules/blog/blog.route";
import { UploadRoute } from "../modules/cloudinary/upload.route";

const router = express.Router();

const moduleRoutes = [
  {
    path: "/auth",
    route: AuthRoutes,
  },
  {
    path: "/upload",
    route: UploadRoute,
  },
  // { path: "/blog", route: BlogRoutes },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));
export default router;
