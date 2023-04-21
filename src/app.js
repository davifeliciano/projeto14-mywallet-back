import express, { json } from "express";
import cors from "cors";
import router from "./routes/index.routes.js";

const app = express();
const port = 5000;
app.use(cors());
app.use(json());
app.use(router);

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
