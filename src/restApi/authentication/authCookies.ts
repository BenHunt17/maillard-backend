import { CookieOptions } from "express";

const DAY_IN_MILLISECONDS = 24 * 3600 * 1000;

export const authCookieSettings = {
  httpOnly: true,
  signed: true,
  sameSite: "none",
  secure: true,
  expires: new Date(Date.now() + DAY_IN_MILLISECONDS),
} satisfies CookieOptions;
