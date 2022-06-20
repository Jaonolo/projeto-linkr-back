import { Router } from 'express';
import { editPostController, newPostController, getPostsByHashtag } from '../controllers/postController.js';
import { editPostValidation, newPostValidation } from '../middlewares/postValidator.js';

const postRouter = Router()

postRouter.post('/newpost', newPostValidation, newPostController)
postRouter.put('/editpost', editPostValidation, editPostController)
postRouter.get("/hashtag/:hashtag", getPostsByHashtag)

export default postRouter