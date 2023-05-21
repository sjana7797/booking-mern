import { Router } from "express";
import * as AuthController from "../controller/auth";

const router = Router();

router.post("/register", AuthController.register);
router.post("/login", AuthController.login);
router.post("/logout", AuthController.logout);

export { router as authRouter };
