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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = exports.registrar = void 0;
const db_config_1 = require("../config/db_config");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const jwt = jsonwebtoken_1.default;
const jwtHelper_1 = require("../auth/jwtHelper");
require('dotenv').config();
const registrar = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let { nombre, email, password, genero, fechanacimiento, infoMedica, gustos } = req.body;
    let { estatura, peso, enfcardiaca, alergia, enfrespiratorias, cirugia, enfdegenerativa } = infoMedica;
    let { futbol, basket, voley, salsa, zumba, folklor } = gustos;
    try {
        let hashedPass = yield bcrypt_1.default.hash(password, 10);
        const result = yield db_config_1.pool.query(`SELECT * FROM usuarios WHERE email = $1`, [email]);
        console.log(result);
        if (result.rowCount === 0) {
            const result2 = yield db_config_1.pool.query(`INSERT INTO usuarios(nombre, email, password, genero, fechaNacimiento)
             VALUES($1,$2,$3,$4,$5) RETURNING id`, [nombre, email, hashedPass, genero, fechanacimiento]);
            let idUsuario = parseInt(result2.rows[0].id);
            let infM = yield db_config_1.pool.query(`INSERT INTO informacionesmedicas(estatura, peso, enfCardiaca, alergia, enfRespiratorias, cirugia, enfDegenerativa)
             values($1,$2,$3,$4,$5,$6,$7) RETURNING id`, [estatura, parseInt(peso), enfcardiaca, alergia, enfrespiratorias, cirugia, enfdegenerativa]);
            let idF = infM.rows[0].id;
            let gustosResult = yield db_config_1.pool.query(`INSERT INTO gustos(folklor, salsa, zumba, futbol, basket, voley) 
             values($1,$2,$3,$4,$5,$6) RETURNING id_gustos`, [folklor, salsa, zumba, futbol, basket, voley]);
            let idG = gustosResult.rows[0].id_gustos;
            let update = yield db_config_1.pool.query(`UPDATE usuarios set informacionmedica = $1, gustos = $2 WHERE id = $3`, [idF, idG, idUsuario]);
            return res.status(200).send({ message: 'El usuario ha sido creado con exito!' });
        }
        return res.status(400).send({ message: 'El email ya existe' });
    }
    catch (error) {
        return res.status(500).send({ message: error });
    }
});
exports.registrar = registrar;
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let { email, pass } = req.body;
    try {
        const result = yield db_config_1.pool.query(`SELECT * FROM usuarios WHERE usuarios.email = $1`, [email]);
        if (result.rowCount !== 0) {
            let validPass = yield bcrypt_1.default.compare(pass, result.rows[0].password);
            if (!validPass)
                return res.status(401).send({ message: "usuario o contrasena incorrecta" });
            let accessToken = (0, jwtHelper_1.signToken)(result.rows[0]);
            let data = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET || 'unsecreto');
            return res.status(202).header('authorization', 'Bearer ' + accessToken).send({ token: accessToken, user: data });
        }
        return res.status(401).send({ message: 'Usuario o contraseña incorrecta.' });
    }
    catch (error) {
        return res.status(500).send({ message: error });
    }
});
exports.login = login;
