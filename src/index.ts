import express from "express";
import dotenv from "dotenv";
import { connectToDbTest } from "./db";

dotenv.config();

const app = express();
const port = process.env.PORT;

app.get("/", (_, res) => {
  res.send("Maillard API");
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
  connectToDbTest();
});