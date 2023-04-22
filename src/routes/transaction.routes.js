import { Router } from "express";
import validateToken from "../middlewares/validateToken.js";
import validateSchema from "../middlewares/validateSchema.js";
import transactionSchema from "../schemas/transaction.schemas.js";
import {
  getTransactions,
  setTransaction,
  getTotal,
} from "../controllers/transaction.controllers.js";

const router = Router();

router.use(validateToken);
router.get("/transactions", getTransactions);
router.post("/transactions", validateSchema(transactionSchema), setTransaction);
router.get("/transactions/total", getTotal);

export default router;
