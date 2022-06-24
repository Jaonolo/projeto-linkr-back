import { Router } from "express";
import { newRepostController } from "../controllers/repostController.js";
import {  newRepostValidation } from "../middlewares/repostValidator.js";


import {authValidator} from "./../middlewares/authValidator.js"
import { newGetTimelineList } from '../controllers/repostController.js';
import { timelineValidation } from '../middlewares/repostValidator.js';

const repostRouter = Router()

repostRouter.post('/repost', newRepostValidation, newRepostController)
//repostRouter.get('/timelinelist', getTimelineListValidation, getTimelineList)

//Novo router se aprovado apagar o de cima
repostRouter.get('/timelinelist', authValidator, timelineValidation, newGetTimelineList)

export default repostRouter