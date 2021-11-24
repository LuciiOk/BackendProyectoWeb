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
exports.getFichas = void 0;
const db_config_1 = require("../config/db_config");
const getFichas = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const result = yield db_config_1.pool.query(`SELECT informacionesmedicas.* FROM informacionesmedicas 
            JOIN usuarios ON informacionesmedicas.id = usuarios.informacionmedica WHERE usuarios.id = $1`, [id]);
        return res.status(200).send(result.rows[0]);
    }
    catch (error) {
        return res.status(500).send({ message: error });
    }
});
exports.getFichas = getFichas;
const postFichas = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { estatura, enfermedad, enfermedadrespiratoria, cirugia, alergia, enfermedadDegenerativa } = req.body;
    db_config_1.pool.query(`INSERT INTO informacionesmedicas(estatura, enfermedad, enfermedadrespiratoria, cirugia, alergia, enfermedaddegenerativa)
        values($1,$2,$3,$4,$5,$6) RETURNING id`, [estatura, enfermedad, enfermedadrespiratoria, cirugia, alergia, enfermedadDegenerativa], (err, result) => {
        if (err) {
            res.status(400);
        }
        const id = result.rows[0].id;
        console.log(id);
        db_config_1.pool.query(`UPDATE usuarios set informacionmedica = $1
            WHERE id = $2`, [id, req.params.id], (err, result) => {
            if (err) {
                res.status(400);
            }
            res.status(201).send('creado');
        });
    });
});
