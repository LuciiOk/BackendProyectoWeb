import {Router} from 'express'
import { addAmigo, deleteAmigo, getAmigos } from '../controllers/amigos.controller';
import { isAuthenticated } from '../auth/jwtHelper';
const router = Router();

// Aqui se obtiene la lista de amigos que tiene un usuario
router.get('/:id', isAuthenticated, getAmigos);

// Aqui se agrega un nuevo amigo
router.post('/', isAuthenticated, addAmigo);

// Eliminacion de un amigo 
router.delete('/:id_amigo/:id_usuario', isAuthenticated, deleteAmigo);

export default router;