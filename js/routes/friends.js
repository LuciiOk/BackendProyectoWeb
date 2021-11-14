"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const app = require("express");
const { pool } = require('../config/db_config');
const router = app.Router();
// Aqui se obtiene la lista de amigos que tiene un usuario
router.get('/', (req, res) => {
    const { id } = req.body;
    pool.query(`SELECT amigos.nombre as amigo FROM amigos
        inner join usuarios on amigos.id_usuario = usuarios.id
        WHERE usuarios.id = $1`, [id], (err, result) => {
        if (err) {
            res.status(400).send({ message: err });
        }
        res.status(200)
            .send(JSON.parse(JSON.stringify(result.rows)));
    });
});
// Aqui se agrega un nuevo amigo
router.post('/', (req, res) => {
    const { id, nombre } = req.body;
    pool.query(`INSERT INTO amigos(id_usuario, nombre)
        VALUES($1, $2) `, [id, nombre], (err, result) => {
        if (err) {
            res.status(400).send({ message: err });
        }
        res.status(201)
            .send({ message: 'El amigo ha sido creado con exito.' });
    });
});
// Eliminacion de un amigo 
router.delete('/', (req, res) => {
    const { id_amigo, id_usuario } = req.body;
    pool.query(`DELETE FROM amigos 
        WHERE amigos.id_amigo = $1 AND amigos.id_usuario = $2`, [id_amigo, id_usuario], (err, result) => {
        if (err) {
            res.status(400).send({ message: err });
        }
        res.status(202).send({ message: 'El amigo ha sido eliminado con exito' });
    });
});
module.exports = router;
