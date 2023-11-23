import dotenv from "dotenv";
import { MongoClient } from "mongodb";

dotenv.config();

const client = new MongoClient(process.env.MONGO_URI || "");

export async function getDb() {
  try {
    await client.connect();
  } catch (e) {
    console.error(e);
    process.exit(1);
  }

  return client.db("maillard-recipe-management");
}
