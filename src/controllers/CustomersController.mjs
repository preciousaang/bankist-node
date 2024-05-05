import { matchedData } from "express-validator";
import { createCustomer } from "../services/CustomerService.mjs";

export const create = async (req, res) => {
  try {
    const data = matchedData(req);
    const customer = await createCustomer(data);
    // console.log(customer);
    return res.status(201).json({ customer });
  } catch (err) {
    console.log(err);
  }
};

export const index = (req, res) => {
  // index logic
};

export const update = (req, res) => {
  // update logic
};

export const block = (req, res) => {
  // block logic
};
