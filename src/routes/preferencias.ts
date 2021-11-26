import {Router} from 'express'
import { deletePreferencia, getPreferencias, updatePreferencia } from '../controllers/preferencias.controller';
import { isAuthenticated } from '../auth/jwtHelper';
const routes = Router();

routes.get('/:id', isAuthenticated, getPreferencias);

routes.delete('/:id', isAuthenticated, deletePreferencia);

routes.put('/:id', isAuthenticated, updatePreferencia);

export default routes;
