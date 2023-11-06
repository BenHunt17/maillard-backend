import { Request, Response, NextFunction } from "express";
import { ApiError } from "../../domain/types/common/apiError";

export function errorHandlerMiddleware(
  error: ApiError,
  _0: Request,
  res: Response,
  _1: NextFunction
) {
  const statusCode = error.statusCode || 500;

  res.status(statusCode).send({ error: error.message });
}
