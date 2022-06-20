import { Router } from "express";
import { getTrendingHashTags } from "../controllers/hashtagsController.js";

const hashtagRouter = Router();

hashtagRouter.get("/trending-hashtags", getTrendingHashTags);

export default hashtagRouter;