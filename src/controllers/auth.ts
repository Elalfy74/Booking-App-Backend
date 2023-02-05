import { RequestHandler } from "express";
import createError from "http-errors";
import bycriptjs from "bcryptjs";

import User from "../models/user/user";
import { LoginBody } from "../types/user.types";
import { serialize } from "cookie";

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

// @desc    Register new user using cookies
// @route   POST /api/auth/signup-cookies
// @access  Public
export const signupCookies: RequestHandler = async (req, res, next) => {
  const user = await User.signupUser(req.body);

  const token = user.generateCookiesToken();

  res.setHeader("Set-Cookie", token);

  res.status(201).send({
    userId: user._id,
    firstName: user.firstName,
    lastName: user.lastName,
  });
};

// @desc    Login user using cookies
// @route   POST /api/auth/login-cookies
// @access  Public
export const loginCookies: RequestHandler = async (req, res, next) => {
  const { email, password }: LoginBody = req.body;

  const user = await User.findByEmail(email);

  if (!user) throw createError.Unauthorized("Invalid email or password");

  const isEq = await bycriptjs.compare(password, user.password);

  if (!isEq) throw createError.Unauthorized("Invalid email or password");

  const token = user.generateCookiesToken();

  res.setHeader("Set-Cookie", token);

  res.status(200).send({
    userId: user._id,
    firstName: user.firstName,
    lastName: user.lastName,
  });
};

// @desc    Logout user
// @route   POST /api/auth/logout
// @access  Public
export const logout: RequestHandler = async (req, res, next) => {
  const { cookies } = req;

  const jwt = cookies.JWT_TOKEN;

  if (!jwt) {
    return res.json({ message: "You are already not logged in..." });
  } else {
    const serialised = serialize("JWT_TOKEN", "", {
      httpOnly: true,
      maxAge: -1,
      sameSite: "strict",
      path: "/",
    });

    res.setHeader("Set-Cookie", serialised);
    res.status(200).send({ message: "Successfuly logged out!" });
  }
};
