import { NextFunction, Request, Response } from "express";
import { authCookieSettings } from "./authCookies";
import { getUserInfo } from "./authenticationService";
import { isAdminOrThrow } from "../../authorization/isAdminOrThrow";

export default async function adminAuthorizationMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const bearerToken = req.headers.authorization;

  if (!(bearerToken && bearerToken.startsWith("Bearer "))) {
    return;
  }

  const accessToken = bearerToken.substring(7);
  const userInfo = await getUserInfo(accessToken);
  await isAdminOrThrow(userInfo.id, userInfo.email);

  next();
}
