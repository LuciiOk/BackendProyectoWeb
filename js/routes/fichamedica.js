"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const app = require('express');
const router = app.Router();
const { pool } = require('../config/db_config');
router.get('/', (req, res) => {
    pool.query(`SELECT * FROM informacionesmedicas`, (err, result) => {
        if (err) {
            throw err;
        }
        res.send(result);
    });
});
router.get('/:id', (req, res) => {
    const { id } = req.body;
    pool.query(`SELECT * FROM informacionesmedicas WHERE informacionesmedicas.id = $1`, [id], (err, result) => {
        if (err) {
            throw err;
        }
        res.send(result);
    });
});
