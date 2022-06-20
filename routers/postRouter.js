import { Router } from 'express';

import { deletePostController, editPostController, newPostController, getPostsByHashtag } from '../controllers/postController.js';
import { deletePostValidation, editPostValidation, newPostValidation } from '../middlewares/postValidator.js';

const postRouter = Router()

postRouter.post('/newpost', newPostValidation, newPostController)
postRouter.put('/editpost', editPostValidation, editPostController)
postRouter.delete('/deletepost/:id', deletePostValidation, deletePostController)
postRouter.get("/hashtag/:hashtag", getPostsByHashtag)

export default postRouter