import { Router } from 'express';
import { timeLineController } from '../controllers/timeLineController.js';
import { authValidator } from '../middlewares/authValidator.js'

const timeLineRouter = Router()

timeLineRouter.get('/timeline', timeLineController)

export default timeLineRouter;