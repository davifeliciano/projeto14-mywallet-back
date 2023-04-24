import Joi from "joi";

const postSchema = Joi.object({
  description: Joi.string().trim().required(),
  amount: Joi.number().positive().required(),
  type: Joi.string().valid("credit", "debit").required(),
});

const patchSchema = Joi.object({
  description: Joi.string().trim().required(),
  amount: Joi.number().positive().required(),
});

export { postSchema, patchSchema };
