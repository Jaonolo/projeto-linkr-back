import { Router } from 'express';

import { signupController, loginController } from '../controllers/auth.js'
import { signupSchema, loginSchema  } from '../schemas/authSchemas.js';

import { schemaValidator } from '../middlewares/schemaValidator.js';

const authRouter = Router()

authRouter.post('/signup', schemaValidator(signupSchema), signupController)
authRouter.post('/login', schemaValidator(loginSchema), loginController)

export default authRouter