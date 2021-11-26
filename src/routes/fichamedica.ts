import { Router } from "express";
const router = Router();
import {isAuthenticated} from '../auth/jwtHelper';
import { deleteFicha, getFichas, updateFicha } from "../controllers/fichas.controller";

router.get('/:id', isAuthenticated, getFichas);

router.delete('/:id', isAuthenticated, deleteFicha);

router.put('/:id', isAuthenticated, updateFicha);

export default router;

