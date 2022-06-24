import { Router } from 'express';
import { getUser, getUsersByName, getUsersByNameFollowersFirst, follow, unfollow, checkIfFollows } from '../controllers/usersController.js';
import { authValidator } from '../middlewares/authValidator.js';
import { schemaValidator } from '../middlewares/schemaValidator.js';
import { getUsersByNameSchema } from '../schemas/userSchemas.js';

const usersRouter = Router()

usersRouter.get('/user', getUser)
usersRouter.post('/users', authValidator, schemaValidator(getUsersByNameSchema), getUsersByNameFollowersFirst)
//usersRouter.get('/users/:id', authValidator, getUserById);
usersRouter.get('/checkiffollows/:userId/:followId', checkIfFollows)
usersRouter.post('/follow/:userId/:followId', follow)
usersRouter.delete('/unfollow/:userId/:followId', unfollow)

export default usersRouter