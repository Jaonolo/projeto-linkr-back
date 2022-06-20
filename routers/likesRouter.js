import { Router } from 'express';
import { postLikes } from '../controllers/likesController.js';

//import { signupController, loginController } from '../controllers/auth.js'
//import schemaValidator from '../middlewares/schemaValidator.js';

const likesRouter = Router()

likesRouter.patch('/togglelike/:postId', postLikes)//, schemaValidator('signup'), signupController)
//likesRouter.post('/unlike/:postId', deleteLikes)//, schemaValidator('login'), loginController)

export default likesRouter