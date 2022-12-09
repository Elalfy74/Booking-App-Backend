import { Router } from "express";

import validator from "../middlewares/validator";
import { loginSchema, signupSchema } from "../models/user/user-validation";

import * as authController from "../controllers/auth";

const router = Router();

router.post("/signup", validator(signupSchema), authController.signup);

router.post("/login", validator(loginSchema), authController.login);

export default router;
