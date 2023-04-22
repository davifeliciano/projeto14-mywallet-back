import jwt from "jsonwebtoken";

export default function validateToken(req, res, next) {
  const { authorization } = req.headers;
  const token = authorization?.replace(/bearer\s/gi, "");

  try {
    const { user } = jwt.verify(token, process.env.SECRET_KEY);
    res.locals.user = user;
  } catch (err) {
    return res.sendStatus(401);
  }

  next();
}
