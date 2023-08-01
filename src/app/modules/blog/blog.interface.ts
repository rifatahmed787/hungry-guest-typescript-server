import { Model } from "mongoose";

export type IBlog = {
  title: string;
  tags: [string];
  category: string;
  image: [string];
  description: string;
};

export type BlogModel = Model<IBlog>;
