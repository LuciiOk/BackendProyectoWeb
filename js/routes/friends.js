"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const app = require("express");
const { pool } = require('../config/db_config');
const router = app.Router();
// aqui se obtiene la lista de amigos que tiene un usuario
router.get('/', (req, res) => {
    let user = req.body;
    pool.query(`SELECT distinct amigos.nombre as amigo FROM amigos, usuarios 
        WHERE amigos.id_usuario = $1`, [user.id], (err, result) => {
        if (err) {
            res.status(400).send({ message: err });
        }
        res.status(200)
            .send(JSON.parse(JSON.stringify(result.rows)));
    });
});
// aqui se agrega un nuevo amigo
router.post('/', (req, res) => {
    const data = req.body;
    pool.query(`INSERT INTO amigos(id_usuario, nombre)
        VALUES($1, $2) `, [data.id, data.nombre], (err, result) => {
        if (err) {
            res.status(400).send({ message: err });
        }
        res.status(201)
            .send({ message: 'El amigo ha sido creado con exito.' });
    });
});
// eliminacion de un amigo 
router.delete('/', (req, res) => {
    const data = req.body;
    pool.query(`DELETE FROM amigos 
        WHERE amigos.id_amigo = $1 AND amigos.id_usuario = $2
    `, [data.id_amigo, data.id_usuario], (err, result) => {
        if (err) {
            res.status(400).send({ message: err });
        }
        res.status(202).send({ message: 'El amigo ha sido eliminado con exito' });
    });
});
module.exports = router;
