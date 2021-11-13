"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const app = require("express");
const router = app.Router();
const { pool } = require('../config/db_config');
const { isAuthenticated } = require('../auth/jwtHelper');
router.get('/', isAuthenticated, (req, res) => {
    const { email } = req.body;
    pool.query(`SELECT * FROM informacionesmedicas inner join usuarios
         on email = $1`, [email], (err, result) => {
        if (err) {
            throw err;
        }
        res.send(result.rows);
    });
});
router.patch('/', isAuthenticated, (req, res) => {
    const { email } = req.body;
    pool.query(`SELECT * FROM informacionesmedicas inner join usuarios
         on email = $1`, [email], (err, result) => {
        if (err) {
            throw err;
        }
        res.send(result.rows);
    });
});
module.exports = router;
