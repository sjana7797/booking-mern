import { NextFunction, Request, Response } from "express";

export class ErrorHandler extends Error {
  constructor(message: string, public status: number) {
    super(message);
  }
}

export const errorHandler = (
  error: unknown,
  req: Request,
  res: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _next: NextFunction
) => {
  console.error(error);
  if (error instanceof ErrorHandler) {
    return res.status(error.status ?? 500).json({
      message: error.message,
      error,
      statusCode: error.status,
    });
  }
  return res.status(500).json({
    message: "Internal Server Error",
    error,
    statusCode: 500,
  });
};
