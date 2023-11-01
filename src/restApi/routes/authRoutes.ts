import { Router } from "express";
import dotenv from "dotenv";
import {
  getAuthUrl,
  getUserCredentials,
  logout,
} from "../authentication/authenticationUtils";
import authenticateMiddleware from "../authentication/authenticationMiddleware";
import { authCookieSettings } from "../authentication/authCookies";

dotenv.config();

export const authRouter = Router();

authRouter.get("/google/login", (_, res) => {
  res.header("Referrer-Policy", "no-referrer-when-downgrade");

  const authUrl = getAuthUrl();
  res.json({ url: authUrl });
});

authRouter.get("/google/redirect", async (req, res) => {
  const code = req.query.code;
  if (typeof code !== "string") {
    res.status(404).json({ message: "Invalid code" });
    return;
  }

  try {
    const userCredentials = await getUserCredentials(code);

    // const userInfo = await getUserInfo(userCredentials.access_token);
    // if (userInfo.id !== "valid id") {
    //   //TODO - implement db check
    //   throw new ApiError("User is not an administrator",403);
    // }

    res.cookie(
      "access_token",
      userCredentials.access_token,
      authCookieSettings
    );
    res.cookie(
      "refresh_token",
      userCredentials.refresh_token,
      authCookieSettings
    );
    res.redirect(303, `${process.env.CONSUMER_URL}/`);
  } catch (e) {
    console.error(e);
    res.redirect(303, `${process.env.CONSUMER_URL}/`);
  }
});

authRouter.get("/google/admin", authenticateMiddleware, (_, res) =>
  res.send({ message: true })
);

authRouter.get("/google/logout", async (_, res) => {
  try {
    await logout();
    res.json({ message: "Logout successful" });
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: "Something went wrong" });
  }
});
