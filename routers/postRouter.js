import { Router } from 'express';

import { deletePostController, editPostController, newPostController, getPostsByHashtag } from '../controllers/postController.js';
import { deletePostValidation, editPostValidation, newPostValidation } from '../middlewares/postValidator.js';

import {authValidator} from "./../middlewares/authValidator.js"
import { newGetTimelineList } from '../controllers/repostController.js';
import { hashtagPageValidation } from '../middlewares/repostValidator.js';

const postRouter = Router()

postRouter.post('/newpost', newPostValidation, newPostController)
postRouter.put('/editpost', editPostValidation, editPostController)
postRouter.delete('/deletepost/:id', deletePostValidation, deletePostController)
//postRouter.get("/hashtag/:hashtag", getPostsByHashtag)

//Novo router se aprovado apagar o de cima

postRouter.get("/hashtag/:hashtag", authValidator, hashtagPageValidation, newGetTimelineList)

export default postRouter