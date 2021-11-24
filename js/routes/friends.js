"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const amigos_controller_1 = require("../controllers/amigos.controller");
const jwtHelper_1 = require("../auth/jwtHelper");
const router = (0, express_1.Router)();
// Aqui se obtiene la lista de amigos que tiene un usuario
router.get('/:id', jwtHelper_1.isAuthenticated, amigos_controller_1.getAmigos);
// Aqui se agrega un nuevo amigo
router.post('/', jwtHelper_1.isAuthenticated, amigos_controller_1.addAmigo);
// Eliminacion de un amigo 
router.delete('/:id_amigo/:id_usuario', jwtHelper_1.isAuthenticated, amigos_controller_1.deleteAmigo);
exports.default = router;
