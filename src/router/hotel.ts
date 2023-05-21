import { Router } from "express";
import * as HotelController from "../controller/hotel";
import { verifyAdmin, verifyToken, verifyUser } from "../middleware/auth";

const router = Router();

router
  .route("/")
  .post(verifyToken, verifyAdmin, HotelController.createHotel)
  .get(HotelController.getHotels);

router
  .route("/:id")
  .put(verifyToken, verifyUser, HotelController.updateHotel)
  .delete(verifyToken, verifyAdmin, HotelController.deleteHotel)
  .get(HotelController.getHotel);

export { router as hotelRouter };
