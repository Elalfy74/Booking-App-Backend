import Joi from "joi";

export const COMMON_SCHEMA = {
  name: Joi.string().min(2).max(50).messages({
    "string.base": "'name' should be a type of 'string'",
    "string.empty": "'name' cannot be an empty field",
    "string.min": "'name' should have a minimum length of {#limit}",
    "any.required": "'name' is a required field",
  }),

  desc: Joi.string().min(4).max(200).messages({
    "string.base": "'desc' should be a type of 'string'",
    "string.empty": "'desc' cannot be an empty field",
    "string.min": "'desc' should have a minimum length of {#limit}",
    "any.required": "'desc' is a required field",
  }),
};

// export const COMMON_LENGTH = {
//   name: {
//     MIN: [2, "'name' should have a minimum length of 2"],
//     MAX: [50, "'name' should have a maximum length of 50"],
//   },
// };
