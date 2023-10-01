import { Router } from "express";
import dotenv from "dotenv";
import {
  getAuthUrl,
  getUserCredentials,
} from "../authentication/authenticationUtils";

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
    //   throw new Error("User is not an administrator");
    // }

    res.cookie("access_token", userCredentials.access_token, {
      httpOnly: true,
      signed: true,
    });
    res.cookie("refresh_token", userCredentials.refresh_token, {
      httpOnly: true,
      signed: true,
    });
    res.redirect(303, `${process.env.CONSUMER_URL}?success=true`);
  } catch (e) {
    console.error(e);
    res.redirect(303, `${process.env.CONSUMER_URL}?success=false`);
  }
});