import express, {json} from "express";
import dotenv from "dotenv";
import cors from "cors";


import authRouter from "./routers/authRouter.js"
import postRouter from "./routers/postRouter.js";
import usersRouter from "./routers/usersRouter.js";
import postUserRouter from "./routers/postUserRouter.js";
import likesRouter from "./routers/likesRouter.js";

const app = express();

dotenv.config();

app.use(json());
app.use(cors());

app.use(authRouter)

app.use(postRouter)
app.use(usersRouter)
app.use(postUserRouter)

app.use(likesRouter)


const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Mode: ${process.env.MODE || "DEV"}`);
  console.log(`Server is up on port: ${port}`);
});