import { Router } from 'express';
import { getPostByUser } from '.././controllers/postByUserController.js';
import { authValidator } from '../middlewares/authValidator.js';

import { newGetTimelineList } from '../controllers/repostController.js';
import { userPageValidation } from '../middlewares/repostValidator.js';

const postUserRouter = Router()

//postUserRouter.get('/user/:id', authValidator, getPostByUser)

//Novo router se aprovado apagar o de cima

postUserRouter.get('/user/:id', authValidator, userPageValidation, newGetTimelineList)

export default postUserRouter