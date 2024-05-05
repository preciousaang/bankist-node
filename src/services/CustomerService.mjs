import _ from "lodash";
import { require } from "../common/utils.mjs";

const db = require("../models");

/**
 * Create a customer
 *
 * @param {object} data
 * @returns
 */
export const createCustomer = async (data) => {
  return await db.Customer.create(data);
};

/**
 *
 * @param {object} options
 * @returns
 */
export const listCustomers = async (options) => {
  const perPage = _.get(options, "perPage", 20);
  const page = _.get(options, "page", 1);
  const offset = (page - 1) * perPage;

  const data = await db.Customer.findAll({ limit: perPage, offset });

  return {
    perPage,
    currentPage: page,
    data,
  };
};
