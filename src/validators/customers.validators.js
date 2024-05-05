const { body, validationResult } = require("express-validator");

export const createCustomer = async (req, res, next) => {
  body(["firstName", "lastName"]).trim().notEmpty().escape();

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }
  next();
};
