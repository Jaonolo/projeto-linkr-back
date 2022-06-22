import { Router } from 'express';
import { getPostByUser } from '.././controllers/postByUserController.js';
import { authValidator } from '../middlewares/authValidator.js';

const postUserRouter = Router()

postUserRouter.get('/user/:id', authValidator, getPostByUser)

export default postUserRouter