"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
const { pool } = require('../config/db_config');
const jwtHelper_1 = require("../auth/jwtHelper");
const fichas_controller_1 = require("../controllers/fichas.controller");
router.get('/:id', jwtHelper_1.isAuthenticated, fichas_controller_1.getFichas);
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
router.put('/:id', jwtHelper_1.isAuthenticated, (req, res) => {
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
router.delete('/:id', jwtHelper_1.isAuthenticated, (req, res) => {
    let { id } = req.params;
    pool.query(`SELECT informacionmedica FROM usuarios where id = $1`, [id], (err, result) => {
        if (err) {
            if (err) {
                res.status(400).send({ message: 'ha ocurrido un error' });
            }
        }
        let infoM = result.rows[0].informacionmedica;
        console.log();
        pool.query(`DELETE FROM informacionesmedicas WHERE id = $1`, [parseInt(infoM)], (err, result) => {
            if (err) {
                res.status(400).send({ message: 'ha ocurrido un error' });
            }
            res.status(202).send({ message: 'La informacion medica se han eliminado con exito' });
        });
    });
});
exports.default = router;
