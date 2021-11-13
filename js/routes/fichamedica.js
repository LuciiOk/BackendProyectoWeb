"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const app = require('express');
const router = app.Router();
const { pool } = require('../config/db_config');
const isAuthenticated = require('../auth/isAuth');
router.get('/', isAuthenticated, (req, res) => {
    res.send('funciona');
    // pool.query(
    //     `SELECT * FROM informacionesmedicas`, (err:any, result:any) => {
    //         if (err) {
    //             throw err;
    //         }
    //         res.send(result);
    //     }
    // );
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
module.exports = router;
