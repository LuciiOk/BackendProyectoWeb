import { Router } from "express";
const router = Router();
import {isAuthenticated} from '../auth/jwtHelper';
import { deleteFicha, getFichas } from "../controllers/fichas.controller";

router.get('/:id', isAuthenticated, getFichas);

router.delete('/:id', isAuthenticated, deleteFicha);

export default router;

