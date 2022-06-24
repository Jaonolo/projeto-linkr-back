import { Router } from 'express';

import { timelineValidation } from '../middlewares/repostValidator.js';
import {authValidator} from "./../middlewares/authValidator.js"
import { newGetTimelineList } from '../controllers/repostController.js';

const timeLineRouter = Router()

//timeLineRouter.get('/timeline', timeLineController)

timeLineRouter.get('/timeline', authValidator, timelineValidation, newGetTimelineList)

export default timeLineRouter;
