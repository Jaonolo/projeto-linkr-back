import { Router } from 'express';
import { newPostController } from '../controllers/post.js';

const postRouter = Router()

postRouter.post('/newPost', newPostController)

export default postRouter