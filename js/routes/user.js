"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const users_controller_1 = require("../controllers/users.controller");
const { isAuthenticated } = require('../auth/jwtHelper');
const routes = (0, express_1.Router)();
routes.get('/:id', isAuthenticated, users_controller_1.getUser);
routes.delete('/:id', isAuthenticated, users_controller_1.deleteUser);
exports.default = routes;
