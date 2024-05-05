import express from "express";
import {
  fund,
  transfer,
  withdraw,
} from "../controllers/AccountsController.mjs";

const router = express.Router();

router.post("/transfer", transfer);
router.post("/withdraw", withdraw);
router.post("/fund", fund);

export default router;
