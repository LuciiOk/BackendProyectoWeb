"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const app = require("express");
const bcrypt = require('bcrypt');
const { pool } = require('../config/db_config');
const router = app.Router();
const jwt = require('jsonwebtoken');
const { signToken } = require('../auth/jwtHelper');
router.post('/register', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let { nombre, email, password, genero, fechanacimiento, infoMedica, gustos } = req.body;
    let { estatura, peso, enfcardiaca, alergia, enfrespiratorias, cirugia, enfdegenerativa } = infoMedica;
    let { futbol, basket, voley, salsa, zumba, folklor } = gustos;
    let hashedPass = yield bcrypt.hash(password, 10);
    pool.query(`SELECT * FROM usuarios WHERE email = $1
    `, [email], (err, result) => {
        if (err) {
            res.status(400).send({ messagge: 'error' });
        }
        if (result.rows.length > 0) {
            res.status(400).send({ message: 'El email ya existe' });
        }
        else {
            pool.query(`INSERT INTO usuarios(nombre, email, password, genero, fechaNacimiento) VALUES($1,$2,$3,$4,$5)
             RETURNING id`, [nombre, email, hashedPass, genero, fechanacimiento], (err, result) => {
                if (err) {
                    res.status(400).send({ messagge: 'error' });
                }
                let idUsuario = parseInt(result.rows[0].id);
                // se agregan las informaciones medicas del usuario
                pool.query(`INSERT INTO informacionesmedicas(estatura, peso, enfCardiaca, alergia, enfRespiratorias, cirugia, enfDegenerativa)
                values($1,$2,$3,$4,$5,$6,$7) RETURNING id`, [estatura, parseInt(peso), enfcardiaca, alergia, enfrespiratorias, cirugia, enfdegenerativa], (err, result) => {
                    if (err) {
                        res.status(400);
                    }
                    let idF = result.rows[0].id;
                    pool.query(`UPDATE usuarios set informacionmedica = $1
                        WHERE id = $2`, [idF, idUsuario], (err, result) => {
                        if (err) {
                            res.status(400).send({ message: 'error' });
                        }
                    });
                });
                // falta agregar sus preferencias
                pool.query(`INSERT INTO gustos(folklor, salsa, zumba, futbol, basket, voley)
                values($1,$2,$3,$4,$5,$6) RETURNING id_gustos`, [folklor, salsa, zumba, futbol, basket, voley], (err, result) => {
                    if (err) {
                        res.status(400);
                    }
                    let idG = result.rows[0].id_gustos;
                    pool.query(`UPDATE usuarios set gustos = $1
                        WHERE id = $2`, [idG, idUsuario], (err, result) => {
                        if (err) {
                            res.status(400).send({ message: 'error' });
                        }
                    });
                });
                res.status(201).send({ message: 'Usuario creado con exito.', id: result.rows[0].id, id2: result });
            });
        }
    });
}));
router.post('/login', (req, res) => {
    let { email, pass } = req.body;
    pool.query(`SELECT * FROM usuarios WHERE usuarios.email = $1`, [email], (err, result) => __awaiter(void 0, void 0, void 0, function* () {
        // validar que el usuario exista
        if (result.rows.length === 0)
            return res.status(401).send({ message: "usuario o contrasena incorrecta" });
        let validPass = yield bcrypt.compare(pass, result.rows[0].password);
        // validar contrasena
        if (!validPass)
            return res.status(401).send({ message: "usuario o contrasena incorrecta" });
        // generar jwt
        let accessToken = signToken(result.rows[0]);
        jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET, (err, data) => {
            res.header('authorization', 'Bearer ' + accessToken).send({ token: accessToken, user: data });
        });
    }));
});
module.exports = router;
