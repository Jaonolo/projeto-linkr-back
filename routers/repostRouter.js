import { Router } from "express";
import { getTimelineList, newRepostController } from "../controllers/repostController.js";
import { getTimelineListValidation, newRepostValidation } from "../middlewares/repostValidator.js";

const repostRouter = Router()

repostRouter.post('/repost', newRepostValidation, newRepostController)
repostRouter.get('/timelinelist', getTimelineListValidation, getTimelineList)

export default repostRouter