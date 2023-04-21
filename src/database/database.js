import dotenv from "dotenv";
import { MongoClient } from "mongodb";

dotenv.config();

const uri = process.env.MONGO_URI;
const client = new MongoClient(uri);
const db = client.db();

try {
  db.command({ ping: 1 });
  console.log("Successfully pinged database server");
} catch (err) {
  console.error(err);
}

export default db;
