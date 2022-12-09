import { model, Schema } from "mongoose";
import { hash } from "bcryptjs";
import config from "config";
import { sign } from "jsonwebtoken";
import createError from "http-errors";

import {
  IUser,
  UserModel,
  IUserMethods,
  SignupBody,
} from "../../types/user.types";

const userSchema = new Schema<IUser, UserModel, IUserMethods>(
  {
    firstName: {
      type: String,
      required: true,
      minlength: 2,
      maxlength: 50,
    },
    lastName: {
      type: String,
      required: true,
      minlength: 2,
      maxlength: 50,
    },
    email: {
      type: String,
      required: true,
      minlength: 5,
      maxlength: 255,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 5,
      maxlength: 1024,
      select: false,
    },
    avatar: String,
    phone: { type: Number, unique: true },
    isAdmin: { type: Boolean, default: false },
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  this.password = await hash(this.password, 12);
  next();
});

userSchema.methods.generateToken = function () {
  return sign(
    { userId: this._id, isAdmin: this.isAdmin },
    config.get("tokenKey"),
    {
      expiresIn: "1h",
    }
  );
};

userSchema.methods.generateRefreshToken = function () {
  return sign(
    { userId: this._id, isAdmin: this.isAdmin },
    config.get("refreshTokenKey"),
    {
      expiresIn: "1y",
    }
  );
};

userSchema.statics.signupUser = async function (user: SignupBody) {
  const isExist = await this.findOne({ email: user.email });

  if (isExist) throw createError.BadRequest("Email Already exist");

  return this.create(user);
};

userSchema.statics.findByEmail = async function (email: string) {
  return this.findOne({ email }).select("+password");
};

const User = model<IUser, UserModel>("User", userSchema);

export default User;
