"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const app = require("express");
const router = app.Router();
const { pool } = require('../config/db_config');
const { isAuthenticated } = require('../auth/jwtHelper');
router.get('/', isAuthenticated, (req, res) => {
    const { id } = req.body;
    pool.query(`SELECT informacionesmedicas.* FROM informacionesmedicas 
         JOIN usuarios ON informacionesmedicas.id = usuarios.informacionmedica
         WHERE usuarios.id = $1`, [id], (err, result) => {
        if (err) {
            throw err;
        }
        res.send(result.rows[0]);
    });
});
router.post('/:id', (req, res) => {
    const { estatura, enfermedad, enfermedadrespiratoria, cirugia, alergia, enfermedadDegenerativa } = req.body;
    pool.query(`INSERT INTO informacionesmedicas(estatura, enfermedad, enfermedadrespiratoria, cirugia, alergia, enfermedaddegenerativa)
        values($1,$2,$3,$4,$5,$6) RETURNING id`, [estatura, enfermedad, enfermedadrespiratoria, cirugia, alergia, enfermedadDegenerativa], (err, result) => {
        if (err) {
            res.status(400);
        }
        const id = result.rows[0].id;
        console.log(id);
        pool.query(`UPDATE usuarios set informacionmedica = $1
            WHERE id = $2`, [id, req.params.id], (err, result) => {
            if (err) {
                res.status(400);
            }
            res.status(201).send('creado');
        });
    });
});
router.put('/:id', isAuthenticated, (req, res) => {
    const { estatura, enfermedad, enfermedadrespiratoria, cirugia, alergia, enfermedadDegenerativa } = req.body;
    pool.query(`SELECT * FROM usuarios WHERE usuarios.id = $1`, [req.params.id], (err, result) => {
        if (err) {
            res.status(400).send('error');
        }
        if (result.rows.length === 0) {
            res.status(400).send('no existe el usuario');
        }
        const idficha = result.rows[0].informacionmedica;
        pool.query(`UPDATE informacionesmedicas 
             set estatura = $1, enfermedad = $2, enfermedadrespiratoria = $3, cirugia = $4, alergia = $5, enfermedaddegenerativa = $6
             WHERE id = $7`, [estatura, enfermedad, enfermedadrespiratoria, cirugia, alergia, enfermedadDegenerativa, idficha], (err, result) => {
            if (err) {
                res.status(400).send('error');
            }
            res.send('Cambios hechos');
        });
    });
});
module.exports = router;
