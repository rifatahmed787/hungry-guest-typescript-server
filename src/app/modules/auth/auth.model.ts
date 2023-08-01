import bcrypt from "bcrypt";
import mongoose, { Schema, Document } from "mongoose";
import { UserModel } from "./auth.interface";

export interface IUser extends Document {
  userName: string;
  password: string;
  email: string;
}

const userSchema: Schema = new Schema({
  userName: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
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
