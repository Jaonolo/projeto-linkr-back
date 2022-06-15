import { Router } from 'express';
import { newPostController } from '../controllers/postController.js';
import { newPostValidation } from '../middlewares/postValidator.js';

const postRouter = Router()

postRouter.post('/newpost', newPostValidation, newPostController)

export default postRouter