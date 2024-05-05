import express from "express";
import { create, index, update } from "../controllers/CustomersController.mjs";
import { createCustomer } from "../validators/customers.validators.mjs";

const router = express.Router();

router.post("", createCustomer, create);
router.get("", index);
router.put(":userId", update);

export default router;
