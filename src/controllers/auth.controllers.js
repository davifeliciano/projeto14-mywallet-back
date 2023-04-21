import { compareSync, hashSync } from "bcrypt";
import { stripHtml } from "string-strip-html";
import jwt from "jsonwebtoken";
import db from "../database/database.js";

export async function signUp(req, res) {
  const { name, email, password } = res.locals.body;

  try {
    const user = await db.collection("users").findOne({ email });

    if (user) {
      return res.sendStatus(409);
    }

    const saltRounds = 10;
    const hash = hashSync(password, saltRounds);
    const sanitizedName = stripHtml(name).result;
    await db
      .collection("users")
      .insertOne({ name: sanitizedName, email, password: hash });
  } catch (err) {
    console.error(err);
    return res.status(500).send(err);
  }

  return res.sendStatus(201);
}

export async function signIn(req, res) {
  const { email, password } = res.locals.body;

  try {
    const user = await db.collection("users").findOne({ email });

    if (!user) {
      return res.sendStatus(404);
    }

    if (!compareSync(password, user.password)) {
      return res.sendStatus(401);
    }

    const options = { expiresIn: "1h" };
    const token = jwt.sign({ user: user._id }, process.env.SECRET_KEY, options);
    return res.send({ name: user.name, token });
  } catch (err) {
    console.error(err);
    return res.status(500).send(err);
  }
}
