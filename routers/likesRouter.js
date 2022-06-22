import { Router } from 'express';
import { getWhoLiked, postLikes } from '../controllers/likesController.js';
import { authValidator } from '../middlewares/authValidator.js';

const likesRouter = Router()

likesRouter.patch('/togglelike/:postId', postLikes)
likesRouter.get('/likes/:postId', authValidator, getWhoLiked)

export default likesRouter