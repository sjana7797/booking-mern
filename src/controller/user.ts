import { RequestHandler } from "express";
import { applyPatch } from "fast-json-patch";
import { validateId } from "../zodSchema";
import { ErrorHandler } from "../middleware/error";
import User from "../models/user";

export const updateUser: RequestHandler = async (req, res, next) => {
  try {
    const { patch } = req.body;

    const { id } = validateId.parse(req.params);

    let user = await User.findById(id).exec();

    if (!patch.length) {
      return res.status(201).json({
        message: "Updated",
        data: user,
      });
    }

    const patchData = applyPatch(user?.toJSON(), patch).newDocument;

    if (!patchData) {
      return res.status(201).json({ message: "Updated", data: user });
    }

    if (!Object.keys(patchData).length) {
      return res.status(201).json({ message: "Updated", data: user });
    }

    user = await User.findByIdAndUpdate(id, patchData, {
      upsert: false,
      new: true,
    });

    return res.status(201).json({
      message: "Updated",
      data: user,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteUser: RequestHandler = async (req, res, next) => {
  try {
    const { id } = validateId.parse(req.params);

    const user = await User.findByIdAndDelete(id);

    if (!user) {
      throw new ErrorHandler("Unable to find hotel", 400);
    }

    return res.status(200).json({
      message: "Deleted",
    });
  } catch (error) {
    next(error);
  }
};

export const getUser: RequestHandler = async (req, res, next) => {
  try {
    const { id } = validateId.parse(req.params);

    const user = await User.findById(id);

    if (!user) {
      throw new ErrorHandler("Unable to find user", 400);
    }

    return res.status(200).json({
      message: "Fetch successfully",
      data: user,
    });
  } catch (error) {
    next(error);
  }
};

export const getUsers: RequestHandler = async (req, res, next) => {
  try {
    const users = await User.find();

    return res.status(200).json({
      message: "Fetch successfully",
      data: users,
    });
  } catch (error) {
    next(error);
  }
};
