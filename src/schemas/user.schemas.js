import Joi from "joi";

const signUpSchema = Joi.object({
  name: Joi.string().trim().required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(8).required(),
});

const signInSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(8).required(),
});

export { signUpSchema, signInSchema };
