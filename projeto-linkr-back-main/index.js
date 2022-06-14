import express, {json} from "express";
import dotenv from "dotenv";
import router from "./routes/index.js";

const app = express();

dotenv.config();

app.use(json());
app.use(cors());

app.use(router);

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Mode: ${process.env.MODE || "DEV"}`);
  console.log(`Server is up on port: ${port}`);
});