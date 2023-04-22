import Joi from "joi";

const schema = Joi.object({
  description: Joi.string().trim().required(),
  amount: Joi.number(),
});

export default schema;
