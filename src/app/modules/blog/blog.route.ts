import express from "express";
import { BlogController } from "./blog.controller";
import validateRequest from "../../middlewares/validateRequest";
import { BlogValidation } from "./blog.validation";
const router = express.Router();

router.post(
  "/create-blog",
  validateRequest(BlogValidation.createBlogZodSchema),
  BlogController.createBlog
);

router.get("/:id", BlogController.getSingleBlog);

router.get("/", BlogController.getAllBlog);

router.patch(
  "/:id",
  validateRequest(BlogValidation.updateBlogZodSchema),
  BlogController.updateBlog
);

router.delete("/:id", BlogController.deleteBlog);

export const BlogRoutes = router;
