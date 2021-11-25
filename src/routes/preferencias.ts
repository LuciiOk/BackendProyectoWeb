import {Router} from 'express'
import { deletePreferencia, getPreferencias } from '../controllers/preferencias.controller';
import { isAuthenticated } from '../auth/jwtHelper';
const routes = Router();

routes.get('/:id', isAuthenticated, getPreferencias);

routes.delete('/:id', isAuthenticated, deletePreferencia);

export default routes;
