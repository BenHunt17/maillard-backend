import express from "express";
import dotenv from "dotenv";
import { connectToDbTest } from "./db";
import cors from "cors";

dotenv.config();

const app = express();
const port = process.env.PORT;

app.use(cors());

app.get("/", async (_, res) => {
  connectToDbTest()
    .then((_) => res.send("success"))
    .catch((_) => res.send("not successful"));
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
