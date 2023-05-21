import { RequestHandler } from "express";
import Hotel from "../models/hotel";
import { applyPatch } from "fast-json-patch";
import { validateId } from "../zodSchema";
import { ErrorHandler } from "../middleware/error";
import Room from "../models/room";
import { RoomCreationSchema, validateHotelId } from "../zodSchema/room";

export const createRoom: RequestHandler = async (req, res, next) => {
  try {
    const roomData = RoomCreationSchema.parse(req.body);
    const { hotelId } = validateHotelId.parse(req.params);

    const room = await Room.create({ ...roomData, hotel: hotelId });

    await Hotel.findByIdAndUpdate(hotelId, {
      $push: {
        rooms: room.id,
      },
    });

    return res.status(201).json(room);
  } catch (error) {
    next(error);
  }
};

export const updateRoom: RequestHandler = async (req, res, next) => {
  try {
    const { patch } = req.body;

    const { id } = validateId.parse(req.params);
    const { hotelId } = validateHotelId.parse(req.params);

    let room = await Room.findOne({
      _id: id,
      hotel: hotelId,
    }).exec();

    if (!patch.length) {
      return res.status(201).json({
        message: "Updated",
        data: room,
      });
    }

    const patchData = applyPatch(room?.toJSON(), patch).newDocument;

    if (!patchData) {
      return res.status(201).json({ message: "Updated", data: room });
    }

    if (!Object.keys(patchData).length) {
      return res.status(201).json({ message: "Updated", data: room });
    }

    room = await Room.findByIdAndUpdate(id, patchData, {
      upsert: false,
      new: true,
    });

    return res.status(201).json({
      message: "Updated",
      data: room,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteRoom: RequestHandler = async (req, res, next) => {
  try {
    const { id } = validateId.parse(req.params);
    const { hotelId } = validateHotelId.parse(req.params);

    const room = await Room.findOneAndDelete({
      _id: id,
      hotel: hotelId,
    });

    if (!room) {
      throw new ErrorHandler("Unable to find room", 400);
    }

    return res.status(200).json({
      message: "Deleted",
    });
  } catch (error) {
    next(error);
  }
};

export const getRoom: RequestHandler = async (req, res, next) => {
  try {
    const { id } = validateId.parse(req.params);
    const { hotelId } = validateHotelId.parse(req.params);

    const room = await Room.findOne({
      _id: id,
      hotel: hotelId,
    });

    if (!room) {
      throw new ErrorHandler("Unable to find room", 400);
    }

    return res.status(200).json({
      message: "Fetch successfully",
      data: room,
    });
  } catch (error) {
    next(error);
  }
};

export const getRooms: RequestHandler = async (req, res, next) => {
  try {
    const { hotelId } = validateHotelId.parse(req.params);
    const rooms = await Room.find({
      hotel: hotelId,
    });

    return res.status(200).json({
      message: "Fetch successfully",
      data: rooms,
    });
  } catch (error) {
    next(error);
  }
};
