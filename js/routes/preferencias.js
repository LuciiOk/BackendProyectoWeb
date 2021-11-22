"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const app = require("express");
const { pool } = require('../config/db_config');
const { isAuthenticated } = require('../auth/jwtHelper');
const router = app.Router();
router.get('/:id', (req, res) => {
    const { id } = req.params;
    pool.query(`SELECT gustos.* FROM usuarios
        INNER JOIN gustos on usuarios.gustos = gustos.id_gustos
        where usuarios.id = $1`, [id], (err, result) => {
        if (err) {
            res.status().send({ message: err });
        }
        res.status(200).send(result.rows[0]);
    });
});
router.post('/', isAuthenticated, (req, res) => {
    pool.query(``);
});
router.delete('/', isAuthenticated, (req, res) => {
    pool.query(``);
});
router.put('/', isAuthenticated, (req, res) => {
    pool.query(``);
});
module.exports = router;
