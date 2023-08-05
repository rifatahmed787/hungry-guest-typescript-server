import { Model } from "mongoose";

export type IBook = {
  name: string;
  email: string;
  time: string;
  people: string;
  phone: string;
  date: string;
};

export type BlogModel = Model<IBook>;
