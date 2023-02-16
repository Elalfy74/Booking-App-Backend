import { Router } from 'express';

import validator from '../middleware/validator';
import { loginSchema, signupSchema } from '../models/user/user-validation';

import * as authController from '../controllers/auth';

const router = Router();

// POST
// api/auth/signup
router.post('/signup', validator({ bodySchema: signupSchema }), authController.signupCookies);

// POST
// api/auth/login
router.post('/login', validator({ bodySchema: loginSchema }), authController.loginCookies);

// POST
// api/auth/logout
router.post('/logout', authController.logout);

export default router;
