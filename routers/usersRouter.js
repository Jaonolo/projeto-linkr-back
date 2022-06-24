import { Router } from 'express';
import { getUser, getUsersByName, getUsersByNameFollowersFirst } from '../controllers/usersController.js';
import { authValidator } from '../middlewares/authValidator.js';
import { schemaValidator } from '../middlewares/schemaValidator.js';
import { getUsersByNameSchema } from '../schemas/userSchemas.js';

const usersRouter = Router()

usersRouter.get('/user', getUser)
usersRouter.post('/users', authValidator, schemaValidator(getUsersByNameSchema), getUsersByNameFollowersFirst)
//usersRouter.get('/users/:id', authValidator, getUserById);

export default usersRouter