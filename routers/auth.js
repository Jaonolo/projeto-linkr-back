import { Router } from 'express';

import { signupController, loginController } from '../controllers/auth.js'
//import schemaValidator from '../middlewares/schemaValidator.js';

const authRouter = Router()

authRouter.post('/signup', signupController)//, schemaValidator('signup'), signupController)
authRouter.post('/login', loginController)//, schemaValidator('login'), loginController)

export default authRouter