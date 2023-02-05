import { HydratedDocument, Model } from "mongoose";

export type LoginBody = {
  email: string;
  password: string;
};

export type SignupBody = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
};

export interface IUser {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  avatar?: string;
  phone?: number;
  isAdmin: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface IUserMethods {
  generateToken(): string;
  generateRefreshToken(): string;
  generateCookiesToken(): string;
}

export interface UserModel extends Model<IUser, {}, IUserMethods> {
  signupUser(user: SignupBody): Promise<HydratedDocument<IUser, IUserMethods>>;
  findByEmail(email: string): Promise<HydratedDocument<IUser, IUserMethods>>;
}
