import { NextFunction, Request, Response } from "express";
import { getUserInfo } from "./authenticationService";
import { isAdminOrThrow } from "../../authorization/isAdminOrThrow";
import { ApiError } from "../../domain/types/common/apiError";

export default async function adminAuthorizationMiddleware(
  req: Request,
  _: Response,
  next: NextFunction
) {
  try {
    const bearerToken = req.headers.authorization;

    if (!(bearerToken && bearerToken.startsWith("Bearer "))) {
      throw new ApiError("No bearer token provided", 401);
    }

    const accessToken = bearerToken.substring(7);
    const userInfo = await getUserInfo(accessToken);
    await isAdminOrThrow(userInfo.id, userInfo.email);

    next();
  } catch (e) {
    next(e);
  }
}
