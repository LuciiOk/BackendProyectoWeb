"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const app = require('express');
const { isAuthenticated } = require('../auth/jwtHelper');
const { pool } = require('../config/db_config');
const routes = app.Router();
routes.get('/:id', isAuthenticated, (req, res) => {
    const { id } = req.params;
    pool.query(`SELECT id, nombre, email, genero, fechanacimiento, informacionmedica 
    FROM usuarios WHERE id = $1`, [id], (err, result) => {
        if (err) {
            res.status(400).send({ message: 'usuario no encontrado' });
        }
        res.status(200).send(result.rows);
    });
});
routes.delete('/:id', isAuthenticated, (req, res) => {
    const { id } = req.params;
    pool.query(`DELETE FROM usuarios WHERE id = $1`, [id], (err, result) => {
        if (err) {
            res.status(400).send({ message: 'usuario no encontrado' });
        }
        res.status(200).send({ message: 'usuario eliminado' });
    });
});
module.exports = routes;
