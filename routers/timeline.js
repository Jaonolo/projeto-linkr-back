import { Router } from 'express';
import { getTimeline } from '../controllers/timeline.js';

const timeLine = Router()

timeLine.get('/timeline', getTimeline)

export default timeLine;