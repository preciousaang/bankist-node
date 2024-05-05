import express from "express";
import { create, index, update } from "../controllers/CustomersController.mjs";
import {
  createCustomer,
  indexCustomer,
} from "../validators/customers.validators.mjs";

const router = express.Router();

router.post("", createCustomer, create);
router.get("", indexCustomer, index);
router.put(":userId", update);

export default router;
