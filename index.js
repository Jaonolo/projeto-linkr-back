import express, {json} from "express";
import dotenv from "dotenv";
import cors from "cors";

import timeLineRouter from "./routers/timelineRouter.js";

import authRouter from "./routers/authRouter.js"
import postRouter from "./routers/postRouter.js";
import usersRouter from "./routers/usersRouter.js";
import postUserRouter from "./routers/postUserRouter.js";
import likesRouter from "./routers/likesRouter.js";
import hashtagRouter from "./routers/hashTagRouter.js";
import commentsRouter from "./routers/commentsRouter.js";
import repostRouter from "./routers/repostRouter.js";
import testRouter from "./routers/testeRouter.js";

const app = express();

dotenv.config();

app.use(json());
app.use(cors());

//routes
app.use(authRouter)
app.use(postRouter)
app.use(usersRouter)
app.use(timeLineRouter)
app.use(postUserRouter)
app.use(likesRouter)
app.use(hashtagRouter)
app.use(repostRouter)

app.use(commentsRouter)

app.use(testRouter)

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Mode: ${process.env.MODE || "DEV"}`);
  console.log(`Server is up on port: ${port}`);
});