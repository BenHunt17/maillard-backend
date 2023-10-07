import { NextFunction, Request, Response } from "express";
import { getNewAccessToken, getUserInfo } from "./authenticationUtils";

export default async function authenticateMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const accessToken = req.signedCookies.access_token;

  if (!accessToken) {
    res.status(401).json({ message: "No access token found" });
    return;
  }

  let payload: unknown = null;

  try {
    payload = await getUserInfo(accessToken);
    if (!payload) {
      const refreshToken = req.signedCookies.refresh_token;
      if (!refreshToken) {
        res.status(401).json({ message: "No refresh token found" });
        return;
      }

      const tokens = await getNewAccessToken(refreshToken);

      res.cookie("access_token", tokens.access_token, {
        httpOnly: true,
        signed: true,
        sameSite: "none",
        secure: true,
        expires: new Date(Date.now() + 86400),
      });
      res.cookie("refresh_token", tokens.refresh_token, {
        httpOnly: true,
        signed: true,
        sameSite: "none",
        secure: true,
        expires: new Date(Date.now() + 86400),
      });
      payload = await getUserInfo(tokens.access_token);
    }

    req.user = payload;
    next();
  } catch (e) {
    console.error(e);
    res.status(401).json({ message: "Authentication failed" });
  }
}
