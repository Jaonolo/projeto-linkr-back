import { Router } from 'express';
import { getPostByUser } from '.././controllers/postByUserController.js';

//import { signupController, loginController } from '../controllers/auth.js'
//import schemaValidator from '../middlewares/schemaValidator.js';

const postUserRouter = Router()

postUserRouter.get('/user/:id', getPostByUser)//, schemaValidator('signup'), signupController)
//authRouter.post('/login', loginController)//, schemaValidator('login'), loginController)

export default postUserRouter