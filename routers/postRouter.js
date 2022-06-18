import { Router } from 'express';
import { editPostController, newPostController } from '../controllers/postController.js';
import { newPostValidation } from '../middlewares/postValidator.js';

const postRouter = Router()

postRouter.post('/newpost', newPostValidation, newPostController)
postRouter.put('/editpost', editPostController)

export default postRouter