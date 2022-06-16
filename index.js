import express, {json} from "express";
import dotenv from "dotenv";
import cors from "cors";

import authRouter from "./routers/auth.js"
import postRouter from "./routers/post.js";
import usersRouter from "./routers/users.js";
import { getTimeline } from "./controllers/timeline.js";
import timeLine from "./routers/timeline.js";

const app = express();

dotenv.config();

app.use(json());
app.use(cors());

//routes
app.use(authRouter)
app.use(postRouter)
app.use(usersRouter)
app.use(timeLine)

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Mode: ${process.env.MODE || "DEV"}`);
  console.log(`Server is up on port: ${port}`);
});