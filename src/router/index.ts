import { Router } from "express";
import { healthRouter } from "./health";
import { authRouter } from "./auth";
import { userRouter } from "./user";
import { hotelRouter } from "./hotel";
import { roomRouter } from "./room";

const router = Router();

router.use("/", healthRouter);
router.use("/auth", authRouter);
router.use("/user", userRouter);
router.use("/hotel", hotelRouter);
router.use("/room", roomRouter);

export { router };
