import { RequestHandler } from "express";
import createError from "http-errors";
import bycriptjs from "bcryptjs";

import User from "../models/user/user";
import { LoginBody } from "../types/user.types";

// @desc    Register new user
// @route   POST /api/auth/signup
// @access  Public
export const signup: RequestHandler = async (req, res, next) => {
  const user = await User.signupUser(req.body);

  const token = user.generateToken();
  const refreshToken = user.generateRefreshToken();

  res.status(201).send({
    token,
    refreshToken,
  });
};

// @desc    Login user
// @route   POST /api/auth/login
// @access  Public
export const login: RequestHandler = async (req, res, next) => {
  const { email, password }: LoginBody = req.body;

  const user = await User.findByEmail(email);

  if (!user) throw createError.Unauthorized("Invalid email or password");

  const isEq = await bycriptjs.compare(password, user.password);

  if (!isEq) throw createError.Unauthorized("Invalid email or password");

  const token = user.generateToken();
  const refreshToken = user.generateRefreshToken();

  res.status(200).send({
    token,
    refreshToken,
  });
};
