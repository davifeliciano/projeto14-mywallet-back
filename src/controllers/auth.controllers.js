import { compareSync } from "bcrypt";
import jwt from "jsonwebtoken";
import { createUser, getUser } from "../services/user.services.js";

export async function signUpController(req, res) {
  const { name, email, password } = res.locals.body;

  try {
    const user = await getUser(email);

    if (user) {
      return res.sendStatus(409);
    }

    await createUser(name, email, password);
  } catch (err) {
    console.error(err);
    return res.status(500).send(err);
  }

  return res.sendStatus(201);
}

export async function signInController(req, res) {
  const { email, password } = res.locals.body;

  try {
    const user = await getUser(email);

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
