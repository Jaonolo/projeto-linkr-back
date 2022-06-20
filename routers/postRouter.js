import { Router } from 'express';
import { deletePostController, editPostController, newPostController } from '../controllers/postController.js';
import { deletePostValidation, editPostValidation, newPostValidation } from '../middlewares/postValidator.js';

const postRouter = Router()

postRouter.post('/newpost', newPostValidation, newPostController)
postRouter.put('/editpost', editPostValidation, editPostController)
postRouter.delete('/deletepost/:id', deletePostValidation, deletePostController)

export default postRouter