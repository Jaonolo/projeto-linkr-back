import { Router } from 'express';
import { getUser } from '../controllers/users.js';

const usersRouter = Router()

usersRouter.get('/user', getUser)

export default usersRouter