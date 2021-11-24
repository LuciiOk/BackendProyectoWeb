"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const preferencias_controller_1 = require("../controllers/preferencias.controller");
const jwtHelper_1 = require("../auth/jwtHelper");
const routes = (0, express_1.Router)();
routes.get('/:id', jwtHelper_1.isAuthenticated, preferencias_controller_1.getPreferencias);
routes.post('/', jwtHelper_1.isAuthenticated, (req, res) => {
});
routes.delete('/:id', jwtHelper_1.isAuthenticated);
routes.put('/', jwtHelper_1.isAuthenticated, (req, res) => {
});
exports.default = routes;
