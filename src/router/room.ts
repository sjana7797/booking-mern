import { Router } from "express";
import { verifyAdmin, verifyToken, verifyUser } from "../middleware/auth";
import * as RoomController from "../controller/room";

const router = Router();

router
  .route("/:hotelId")
  .post(verifyToken, verifyAdmin, RoomController.createRoom)
  .get(RoomController.getRooms);

router
  .route("/:hotelId/:id")
  .put(verifyToken, verifyUser, RoomController.updateRoom)
  .delete(verifyToken, verifyAdmin, RoomController.deleteRoom)
  .get(RoomController.getRoom);

export { router as roomRouter };
