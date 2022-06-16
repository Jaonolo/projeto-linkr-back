import { Router } from 'express';
import { getTimeline } from '../controllers/timeline.js';

const timeLineRouter = Router()

timeLineRouter.get('/timeline', getTimeline)

export default timeLineRouter;