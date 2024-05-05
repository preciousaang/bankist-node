import express from "express";
import {
  create,
  fund,
  transfer,
  withdraw,
} from "../controllers/AccountsController.mjs";
import { createAccount } from "../validators/accounts.validator.mjs";

const router = express.Router();

router.post("/create", createAccount, create);
router.post("/transfer", transfer);
router.post("/withdraw", withdraw);
router.post("/fund", fund);

export default router;
