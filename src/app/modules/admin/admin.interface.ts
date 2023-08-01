import { Model } from "mongoose";

export type UserName = {
  firstName: string;
  lastName: string;
  middleName: string;
};

export type IAdmin = {
  id: string;
  name: UserName;
  profileImage: string;
  dateOfBirth?: string;
  email: string;
  contactNo: string;

  gender?: "male" | "female";
  permanentAddress?: string;
  presentAddress?: string;
};

interface AdminModel extends Model<IAdmin> {
  findAll(): Promise<IAdmin[]>;
}

export { AdminModel };
