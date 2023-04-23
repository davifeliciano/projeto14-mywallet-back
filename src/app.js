import dotenv from "dotenv";
import express, { json } from "express";
import cors from "cors";
import router from "./routes/index.routes.js";

dotenv.config();

const app = express();
const port = process.env.PORT;
app.use(cors());
app.use(json());
app.use(router);

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
