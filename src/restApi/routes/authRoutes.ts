import { Router } from "express";
import dotenv from "dotenv";
import {
  getTokensWithCode,
  getTokensWithRefreshToken,
} from "../auth/authenticationService";
import { authCookieSettings } from "../auth/authCookies";

dotenv.config();

export const authRouter = Router();

authRouter.post("/gettokens", async (req, res, next) => {
  try {
    const credentials = await getTokensWithCode(req.body.code);

    res.cookie("refresh_token", credentials.refresh_token, authCookieSettings);
    res.json(credentials.access_token);
  } catch (e) {
    next(e);
  }
});

authRouter.get("/refreshtoken", async (req, res, next) => {
  try {
    const refreshToken = req.signedCookies.refresh_token;
    const credentials = await getTokensWithRefreshToken(refreshToken);

    res.cookie("refresh_token", credentials.refresh_token, authCookieSettings);
    res.json(credentials.access_token);
  } catch (e) {
    next(e);
  }
});
