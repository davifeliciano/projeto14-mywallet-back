import { Router } from "express";
import {
  signInController,
  signUpController,
} from "../controllers/auth.controllers.js";
import { signInSchema, signUpSchema } from "../schemas/user.schemas.js";
import validateSchema from "../middlewares/validateSchema.js";

const router = Router();

router.post("/auth/sign-up", validateSchema(signUpSchema), signUpController);
router.post("/auth/sign-in", validateSchema(signInSchema), signInController);

export default router;
