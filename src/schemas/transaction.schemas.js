import Joi from "joi";

const schema = Joi.object({
  description: Joi.string().trim().required(),
  amount: Joi.number().positive().required(),
  type: Joi.string().valid("credit", "debit").required(),
});

export default schema;
