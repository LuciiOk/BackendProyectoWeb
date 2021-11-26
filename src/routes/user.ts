import {Router} from 'express'
import { deleteUser, getUser, updateUser} from '../controllers/users.controller';
import { isAuthenticated } from '../auth/jwtHelper';
const routes = Router();

routes.get('/:id', isAuthenticated, getUser);

routes.delete('/:id', isAuthenticated, deleteUser);

routes.put('/:id', updateUser)

export default routes;