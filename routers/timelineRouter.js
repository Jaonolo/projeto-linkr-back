import { Router } from 'express';
import { timeLineController } from '../controllers/timeLineController.js';

import { testeValidation } from "../middlewares/teste.js";
import {authValidator} from "./../middlewares/authValidator.js"
import { newGetTimelineList } from '../controllers/repostController.js';

const timeLineRouter = Router()

//timeLineRouter.get('/timeline', timeLineController)

timeLineRouter.get('/timeline', authValidator, testeValidation, newGetTimelineList)

export default timeLineRouter;
