import { Router } from 'express';
import { deleteLikes, postLikes } from '../controllers/likesController.js';

//import { signupController, loginController } from '../controllers/auth.js'
//import schemaValidator from '../middlewares/schemaValidator.js';

const likesRouter = Router()

likesRouter.post('/like/:postId', postLikes)//, schemaValidator('signup'), signupController)
likesRouter.post('/unlike/:postId', deleteLikes)//, schemaValidator('login'), loginController)

export default likesRouter