export default function validateSchema(schema) {
  return (req, res, next) => {
    const { error, value } = schema.validate(req.body, { abortEarly: false });

    if (error) {
      const errors = error.details.map((detail) => detail.message);
      return res.status(422).send({ errors });
    }

    res.locals.body = value;
    next();
  };
}
