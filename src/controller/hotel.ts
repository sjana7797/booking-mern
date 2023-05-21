import { RequestHandler } from "express";
import Hotel from "../models/hotel";
import { HotelCreationSchema } from "../zodSchema/hotel";
import { applyPatch } from "fast-json-patch";
import { validateId } from "../zodSchema";
import { ErrorHandler } from "../middleware/error";

export const createHotel: RequestHandler = async (req, res, next) => {
  try {
    const hotelData = HotelCreationSchema.parse(req.body);

    const hotel = new Hotel(hotelData);

    const savedHotel = await hotel.save();

    return res.status(201).json(savedHotel);
  } catch (error) {
    next(error);
  }
};

export const updateHotel: RequestHandler = async (req, res, next) => {
  try {
    const { patch } = req.body;

    const { id } = validateId.parse(req.params);

    let hotel = await Hotel.findById(id).exec();

    if (!patch.length) {
      return res.status(201).json({
        message: "Updated",
        data: hotel,
      });
    }

    const patchData = applyPatch(hotel?.toJSON(), patch).newDocument;

    if (!patchData) {
      return res.status(201).json({ message: "Updated", data: hotel });
    }

    if (!Object.keys(patchData).length) {
      return res.status(201).json({ message: "Updated", data: hotel });
    }

    hotel = await Hotel.findByIdAndUpdate(id, patchData, {
      upsert: false,
      new: true,
    });

    return res.status(201).json({
      message: "Updated",
      data: hotel,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteHotel: RequestHandler = async (req, res, next) => {
  try {
    const { id } = validateId.parse(req.params);

    const hotel = await Hotel.findByIdAndDelete(id);

    if (!hotel) {
      throw new ErrorHandler("Unable to find hotel", 400);
    }

    return res.status(200).json({
      message: "Deleted",
    });
  } catch (error) {
    next(error);
  }
};

export const getHotel: RequestHandler = async (req, res, next) => {
  try {
    const { id } = validateId.parse(req.params);

    const hotel = await Hotel.findById(id);

    if (!hotel) {
      throw new ErrorHandler("Unable to find hotel", 400);
    }

    return res.status(200).json({
      message: "Fetch successfully",
      data: hotel,
    });
  } catch (error) {
    next(error);
  }
};

export const getHotels: RequestHandler = async (req, res, next) => {
  try {
    const hotels = await Hotel.find();

    return res.status(200).json({
      message: "Fetch successfully",
      data: hotels,
    });
  } catch (error) {
    next(error);
  }
};
