import { Router } from "express";
import { signIn, signUp } from "../controllers/auth.controllers.js";
import { signInSchema, signUpSchema } from "../schemas/user.schemas.js";
import validateSchema from "../middlewares/validateSchema.js";

const router = Router();

router.post("/auth/sign-up", validateSchema(signUpSchema), signUp);
router.post("/auth/sign-in", validateSchema(signInSchema), signIn);

export default router;
