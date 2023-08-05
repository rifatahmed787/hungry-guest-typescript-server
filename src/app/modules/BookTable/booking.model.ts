import httpStatus from "http-status";
import { Schema, model } from "mongoose";
import ApiError from "../../../errors/ApiError";
import { IBook } from "./booking.interface";

const bookSchema = new Schema<IBook>(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    people: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    date: {
      type: String,
      required: true,
    },
    time: {
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

bookSchema.pre("save", async function (next) {
  const isExist = await Book.findOne({
    email: this.email,
  });
  if (isExist) {
    throw new ApiError(httpStatus.CONFLICT, "Book is already exist !");
  }
  next();
});

export const Book = model<IBook>("Book", bookSchema);
