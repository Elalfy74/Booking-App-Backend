import Joi from "joi";

export const signupSchema = Joi.object({
  firstName: Joi.string().required().min(2).max(50),
  lastName: Joi.string().required().min(2).max(50),
  email: Joi.string().min(5).max(255).required().email(),
  password: Joi.string().required().min(5).max(1024),
});

export const loginSchema = Joi.object({
  email: Joi.string().min(5).max(255).required().email(),
  password: Joi.string().required().min(5).max(1024),
});
