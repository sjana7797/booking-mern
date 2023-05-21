import { RequestHandler } from "express";
import { ErrorHandler } from "./error";
import jwt, { JsonWebTokenError } from "jsonwebtoken";
import { env } from "../lib/env";
import User from "../models/user";
import { validateId } from "../zodSchema";

export const verifyToken: RequestHandler = async (req, res, next) => {
  try {
    const token = req.cookies.access_token;
    if (!token) throw new ErrorHandler("User not authenticated", 401);
    const info = jwt.verify(token, env.JWT_SECRET_KEY);
    if (typeof info === "string")
      throw new ErrorHandler("User not authenticated", 401);
    const user = await User.findById(info._id);
    if (!user) throw new ErrorHandler("User not authenticated", 401);
    req.user = {
      _id: user._id.toString(),
      email: user.email,
      username: user.username,
      isAdmin: user.isAdmin,
    };
    next();
  } catch (error) {
    if (error instanceof JsonWebTokenError)
      throw new ErrorHandler("Not a valid JWT token", 401);
    throw error;
  }
};

export const verifyUser: RequestHandler = (req, res, next) => {
  const { id } = validateId.parse(req.params);
  if (req.user?._id === id || req.user?.isAdmin) return next();
  next(new ErrorHandler("User not authorised", 403));
};

export const verifyAdmin: RequestHandler = (req, res, next) => {
  if (req.user?.isAdmin) return next();
  next(new ErrorHandler("User not authorised", 403));
};
