import express from "express";
import { create, index, update } from "../controllers/CustomersController.mjs";

const router = express.Router();

router.post("", create);
router.get("", index);
router.put(":userId", update);

export default router;
