import { matchedData } from "express-validator";
import { createCustomer, listCustomers } from "../services/CustomerService.mjs";

export const create = async (req, res) => {
  try {
    const data = matchedData(req);
    const customer = await createCustomer(data);
    return res.status(201).json({ customer });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ err: "Unable to create customer" });
  }
};

export const index = async (req, res) => {
  try {
    const data = await listCustomers(matchedData(req));
    return res.status(200).json(data);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ err: "Unable to list customer" });
  }
  // index logic
};

export const update = (req, res) => {
  // update logic
};

export const block = (req, res) => {
  // block logic
};
