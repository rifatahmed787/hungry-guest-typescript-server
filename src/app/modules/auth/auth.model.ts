import bcrypt from "bcrypt";
import mongoose, { Schema, Document } from "mongoose";
import { UserModel } from "./auth.interface";

export interface IUser extends Document {
  userName: string;
  password: string;
  email: string;
  imageUrl: string | undefined;
}

const userSchema: Schema = new Schema({
  userName: {
    type: String,
    required: false,
    unique: true,
  },
  password: {
    type: String,
    required: false,
  },
  email: {
    type: String,
    required: false,
    unique: true,
  },
  imageUrl: {
    type: String,
    required: true,
  },
});

userSchema.statics.isUserExist = async function (
  email: string
): Promise<IUser | null> {
  return await User.findOne({ email }, { email: 1, password: 1 });
};

userSchema.statics.isPasswordMatched = async function (
  givenPassword: string,
  savedPassword: string
): Promise<boolean> {
  return await bcrypt.compare(givenPassword, savedPassword);
};

const User = mongoose.model<IUser, UserModel>("User", userSchema);

export default User;
