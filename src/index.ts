import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { authRouter } from "./restApi/routes/auth";
import cookieParser from "cookie-parser";

declare module "express" {
  // TODO - figure out how to make this cleaner
  interface Request {
    user?: unknown;
  }
}

dotenv.config();

const app = express();
const port = process.env.PORT;

app.use(cors({ credentials: true, origin: process.env.CONSUMER_URL }));
app.use(cookieParser(process.env.COOKIES_SECRET || ""));

app.get("/", async (_, res) => {
  res.send("");
});

app.use("/auth", authRouter);

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
