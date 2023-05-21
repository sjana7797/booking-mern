import { Router } from "express";
import * as UserController from "../controller/user";
import { verifyAdmin, verifyToken, verifyUser } from "../middleware/auth";

const router = Router();

router.get("/", verifyToken, verifyAdmin, UserController.getUsers);

router.use("/:id", verifyToken, verifyUser);

router
  .route("/:id")
  .put(UserController.updateUser)
  .get(UserController.getUser)
  .delete(UserController.deleteUser);

export { router as userRouter };
