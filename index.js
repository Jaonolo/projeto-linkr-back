import express, {json} from "express";
import dotenv from "dotenv";
import cors from "cors";

import authRouter from "./routers/auth.js"
import postUserRouter from "./routers/postUser.js";

const app = express();

dotenv.config();

app.use(json());
app.use(cors());

app.use(authRouter)
app.use(postUserRouter)

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Mode: ${process.env.MODE || "DEV"}`);
  console.log(`Server is up on port: ${port}`);
});