import { Router } from "express";

import validator from "../middlewares/validator";
import { loginSchema, signupSchema } from "../models/user/user-validation";

import * as authController from "../controllers/auth";

const router = Router();

// POST
// api/auth/signup
router.post("/signup", validator(signupSchema), authController.signup);

// POST
// api/auth/login
router.post("/login", validator(loginSchema), authController.login);

// POST
// api/auth/signup-cookies
router.post(
  "/signup-cookies",
  validator(signupSchema),
  authController.signupCookies
);

// POST
// api/auth/login-cookies
router.post(
  "/login-cookies",
  validator(loginSchema),
  authController.loginCookies
);

// POST
// api/auth/logout
router.post("/logout", authController.logout);

export default router;
