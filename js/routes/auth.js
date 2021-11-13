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
const app = require('express');
const bcrypt = require('bcrypt');
const { pool } = require('../config/db_config');
const router = app.Router();
const { signToken } = require('../auth/jwtHelper');
router.post('/register', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let { user, email, pass, pass2, genero, fechaNacimiento } = req.body;
    let hashedPass = yield bcrypt.hash(pass, 10);
    pool.query(`SELECT * FROM usuarios
        WHERE email = $1
        `, [email], (err, result) => {
        if (err) {
            throw err;
        }
        if (result.rows.length > 0) {
            res.send('El email ya existe');
        }
        else {
            pool.query(`INSERT INTO usuarios(nombre, email, password, genero, fechaNacimiento) VALUES($1,$2,$3,$4,$5) RETURNING id, password`, [user, email, hashedPass, genero, fechaNacimiento], (err, result) => {
                if (err) {
                    throw err;
                }
                res.send("Usuario creado con exito.");
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
        res.header('authorization', 'Bearer ' + accessToken).
            json(accessToken);
    }));
});
module.exports = router;
