import { Blog } from "./blog.model";
import { IBlog } from "./blog.interface";

const createBlog = async (payload: IBlog): Promise<IBlog> => {
  const result = await Blog.create(payload);
  return result;
};

const getSingleBlog = async (id: string): Promise<IBlog | null> => {
  const result = await Blog.findById(id);
  return result;
};

const getAllBlogs = async (): Promise<IBlog[]> => {
  const result = await Blog.find();
  return result;
};

const updateBlog = async (
  id: string,
  payload: Partial<IBlog>
): Promise<IBlog | null> => {
  const result = await Blog.findByIdAndUpdate(id, payload, { new: true });
  return result;
};

const deleteBlog = async (id: string): Promise<IBlog | null> => {
  const result = await Blog.findByIdAndDelete(id);
  return result;
};

export const BlogService = {
  createBlog,
  getSingleBlog,
  getAllBlogs,
  updateBlog,
  deleteBlog,
};
