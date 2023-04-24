import { Router } from "express";
import validateToken from "../middlewares/validateToken.js";
import validateSchema from "../middlewares/validateSchema.js";
import { postSchema, patchSchema } from "../schemas/transaction.schemas.js";
import {
  getTransactionsController,
  postTransactionController,
  patchTransactionController,
  deleteTransactionController,
  getTotalController,
} from "../controllers/transaction.controllers.js";

const router = Router();

router.use(validateToken);
router.get("/transactions", getTransactionsController);

router.post(
  "/transactions",
  validateSchema(postSchema),
  postTransactionController
);

router.patch(
  "/transactions/:id",
  validateSchema(patchSchema),
  patchTransactionController
);

router.delete("/transactions/:id", deleteTransactionController);
router.get("/transactions/total", getTotalController);

export default router;
