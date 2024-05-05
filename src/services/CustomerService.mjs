import { require } from "../common/utils.mjs";

const { Customer } = require("../models");

export const createCustomer = async (data) => {
  return await Customer.create(data);
};
