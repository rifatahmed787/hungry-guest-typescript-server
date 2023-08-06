import User, { IUser } from "../auth/auth.model";

const getUserByEmail = async (email: string): Promise<IUser | null> => {
  try {
    const user = await User.findOne({ email });
    return user;
  } catch (error) {
    throw new Error("Error fetching user by email");
  }
};

const getAllUsers = async (): Promise<IUser[]> => {
  const allUser = await User.find();
  return allUser;
};

const updateUser = async (
  id: string,
  payload: Partial<IUser>
): Promise<IUser | null> => {
  const result = await User.findByIdAndUpdate(id, payload, { new: true });
  return result;
};

const deleteUser = async (id: string): Promise<IUser | null> => {
  const result = await User.findByIdAndDelete(id);
  return result;
};

export const UserService = {
  getUserByEmail,
  getAllUsers,
  updateUser,
  deleteUser,
};
