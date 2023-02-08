import { model, Schema } from 'mongoose';
import { hash } from 'bcryptjs';

import createError from 'http-errors';

import { IUser, UserModel, IUserMethods, SignupBody } from '../../types/user.types';
import { signAccessToken, signCookiesToken, signRefreshToken } from '../../utils/jwt-helper';

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

userSchema.pre('save', async function () {
  this.password = await hash(this.password, 12);
});

userSchema.methods.generateAccessToken = function () {
  return signAccessToken({
    userId: this._id,
    isAdmin: this.isAdmin,
  });
};

userSchema.methods.generateRefreshToken = function () {
  return signRefreshToken({
    userId: this._id,
    isAdmin: this.isAdmin,
  });
};

userSchema.methods.generateCookiesToken = function () {
  return signCookiesToken({
    userId: this._id,
    isAdmin: this.isAdmin,
  });
};

userSchema.statics.signupUser = async function (user: SignupBody) {
  const isExist = await this.findOne({ email: user.email });

  if (isExist) throw createError.BadRequest('Email Already exist');

  return this.create(user);
};

userSchema.statics.findByEmail = async function (email: string) {
  return this.findOne({ email }).select('+password');
};

const User = model<IUser, UserModel>('User', userSchema);

export default User;
