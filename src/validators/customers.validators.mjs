import { body, check, query, validationResult } from "express-validator";
import { require } from "../common/utils.mjs";
const db = require("../models");

export const createCustomer = async (req, res, next) => {
  await body(["firstName", "lastName", "email"])
    .trim()
    .notEmpty()
    .isLength({ max: 255 })
    .escape()
    .run(req);

  await body("email")
    .isEmail()
    .custom(async (value) => {
      const customer = await db.Customer.findOne({ where: { email: value } });
      if (customer) {
        throw new Error("A customer with that email already exists");
      }
    })
    .run(req);

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }
  next();
};

export const indexCustomer = async (req, res, next) => {
  await query(["page", "perPage"]).optional().isInt().run(req);

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }

  next();
};
