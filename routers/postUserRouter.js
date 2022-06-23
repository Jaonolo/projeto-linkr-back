import { Router } from 'express';
import { getPostByUser } from '.././controllers/postByUserController.js';
import { authValidator } from '../middlewares/authValidator.js';

import { testeValidation2 } from '../middlewares/teste.js';
import { getTimelineListTeste } from '../controllers/repostControllerTest.js';

const postUserRouter = Router()

//postUserRouter.get('/user/:id', authValidator, getPostByUser)

postUserRouter.get('/user/:id', authValidator, testeValidation2, getTimelineListTeste)

export default postUserRouter