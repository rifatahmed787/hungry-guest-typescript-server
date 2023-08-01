import httpStatus from "http-status";
import { Schema, model } from "mongoose";
import ApiError from "../../../errors/ApiError";
import { IBlog } from "./blog.interface";

const blogSchema = new Schema<IBlog>(
  {
    title: {
      type: String,
      required: true,
    },
    tags: {
      type: [String],
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    image: {
      type: [String],
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
);

blogSchema.pre("save", async function (next) {
  const isExist = await Blog.findOne({
    title: this.title,
  });
  if (isExist) {
    throw new ApiError(httpStatus.CONFLICT, "Blog is already exist !");
  }
  next();
});

export const Blog = model<IBlog>("Blog", blogSchema);
