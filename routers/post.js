import { Router } from 'express';
import { newPostController } from '../controllers/post.js';
import { newPostValidation } from '../middlewares/post.js';

const postRouter = Router()

postRouter.post('/newpost', newPostValidation, newPostController)

export default postRouter