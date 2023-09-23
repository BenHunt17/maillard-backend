import express from "express";
import dotenv from "dotenv";
import { connectToDbTest } from "./db";

dotenv.config();

const app = express();
const port = process.env.PORT;

app.get("/", (_, res) => {
  connectToDbTest()
    .then((_) => res.send("Connected to DB"))
    .catch((_) => res.send("DB connection unsuccessful"));
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
