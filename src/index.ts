import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { authRouter } from "./restApi/routes/authRoutes";
import cookieParser from "cookie-parser";
import { ingredientsRouter } from "./restApi/routes/ingredientsRouter";
import bodyParser from "body-parser";
import { recipesRouter } from "./restApi/routes/recipesRouter";
import { errorHandlerMiddleware } from "./restApi/error/errorHandlerMiddleware";

declare module "express" {
  // TODO - figure out how to make this cleaner
  interface Request {
    user?: unknown;
  }
}

dotenv.config();

const app = express();
const port = process.env.PORT;

app.use(
  cors({
    credentials: true,
    origin: process.env.CONSUMER_URL,
  })
);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(cookieParser(process.env.COOKIES_SECRET || ""));

app.get("/", async (_, res) => {
  res.send("");
});

app.use("/auth", authRouter);
app.use("/ingredients", ingredientsRouter);
app.use("/recipes", recipesRouter);

app.use(errorHandlerMiddleware);

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
