import { Response } from "express";
import jwt from "jsonwebtoken";
import { env } from "../lib/env";

export function sendCookie(_id: string, isAdmin: boolean, res: Response) {
  const token = jwt.sign({ _id, isAdmin }, env.JWT_SECRET_KEY);

  res.cookie("access_token", token, {
    httpOnly: true,
    maxAge: 1000 * 60 * 60 * 24,
  });
}
