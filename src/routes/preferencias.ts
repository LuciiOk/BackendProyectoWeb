import {Router} from 'express'
import { getPreferencias } from '../controllers/preferencias.controller';
import { isAuthenticated } from '../auth/jwtHelper';
const routes = Router();

routes.get('/:id', isAuthenticated, getPreferencias);

routes.post('/', isAuthenticated, (req:any, res:any) => {

});

routes.delete('/:id', isAuthenticated, );

routes.put('/', isAuthenticated, (req:any, res:any) => {

});

export default routes;
