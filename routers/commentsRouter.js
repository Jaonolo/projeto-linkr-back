import { Router } from 'express';
import { postComments, getComments } from '../controllers/commentsController.js';

import { postCommentsValidation, getCommentsValidation } from '../middlewares/commentsValidator.js';

//import { signupController, loginController } from '../controllers/auth.js'
//import schemaValidator from '../middlewares/schemaValidator.js';

const commentsRouter = Router()

commentsRouter.post('/postcomments/:postId', postCommentsValidation, postComments)
//commentsRouter.get('/getcomments/:postId', getCommentsValidation, getComments)

//TESTE
commentsRouter.get('/getcomments/:postId', getComments)

export default commentsRouter