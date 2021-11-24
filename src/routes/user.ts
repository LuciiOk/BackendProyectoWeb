import {Router} from 'express'
import { deleteUser, getUser } from '../controllers/users.controller';
const { isAuthenticated } = require('../auth/jwtHelper')
const routes = Router();

routes.get('/:id', isAuthenticated, getUser);

routes.delete('/:id', isAuthenticated, deleteUser);

export default routes;