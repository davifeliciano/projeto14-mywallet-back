import { hashSync } from "bcrypt";
import { stripHtml } from "string-strip-html";
import db from "../database/database.js";

export function getUser(email) {
  return db.collection("users").findOne({ email });
}

export function createUser(name, email, password) {
  const saltRounds = 10;
  const hash = hashSync(password, saltRounds);
  const sanitizedName = stripHtml(name).result;

  return db
    .collection("users")
    .insertOne({ name: sanitizedName, email, password: hash });
}
