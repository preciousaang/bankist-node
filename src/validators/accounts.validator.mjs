import { body } from "express-validator";
import { require } from "../common/utils.mjs";

const db = require("../models");

export const createAccount = async (req, res, next) => {
  await body("customerId")
    .notEmpty()
    .custom(async (value) => {
      const customer = await db.Customer.findById(value);
      if (!customer) {
        throw new Error("Customer with that id does not exist");
      }
    })
    .run(req);
};
