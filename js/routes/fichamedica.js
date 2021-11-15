"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const app = require("express");
const router = app.Router();
const { pool } = require('../config/db_config');
const { isAuthenticated } = require('../auth/jwtHelper');
router.get('/', isAuthenticated, (req, res) => {
    const { id } = req.body;
    pool.query(`SELECT informacionesmedicas.* FROM informacionesmedicas 
        inner join usuarios on informacionesmedicas.id = usuarios.informacionmedica where usuarios.id = $1`, [id], (err, result) => {
        if (err) {
            throw err;
        }
        res.send(result.rows);
    });
});
router.put('/:id', isAuthenticated, (req, res) => {
    const { estatura, enfermedad, enfermedadrespiratoria, cirugia, alergia, enfermedadDegenerativa } = req.body;
    pool.query(`SELECT * FROM usuarios WHERE usuarios.id = $1`, [req.params.id], (err, result) => {
        if (err) {
            res.send('error');
        }
        const idficha = result.rows[0].informacionmedica;
        pool.query(`UPDATE informacionesmedicas 
             set estatura = $1, enfermedad = $2, enfermedadrespiratoria = $3, cirugia = $4, alergia = $5, enfermedaddegenerativa = $6
             WHERE id = $7`, [estatura, enfermedad, enfermedadrespiratoria, cirugia, alergia, enfermedadDegenerativa, idficha], (err, result) => {
            if (err) {
                throw err;
            }
            res.send('Cambios hechos');
        });
    });
});
module.exports = router;
