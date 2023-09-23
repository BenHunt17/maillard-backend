import { MongoClient } from "mongodb";
import dotenv from "dotenv";

dotenv.config();

const uri = process.env.MONGO_URI || "";

const client = new MongoClient(uri);

export async function connectToDbTest() {
  try {
    await client.connect();
  } catch (error) {
    console.log(error);
  }
}
