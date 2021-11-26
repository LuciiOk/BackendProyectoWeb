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
exports.updateFicha = exports.deleteFicha = exports.getFichas = void 0;
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
const deleteFicha = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let { id } = req.params;
    console.log(id);
    try {
        let result = yield db_config_1.pool.query(`SELECT informacionmedica FROM usuarios where id = $1`, [id]);
        if (result.rowCount > 0) {
            let infoM = result.rows[0].informacionmedica;
            result = yield db_config_1.pool.query(`DELETE FROM informacionesmedicas WHERE id = $1`, [infoM]);
            if (result.rowCount > 0) {
                return res.status(200).send({ message: 'Ficha Eliminada.' });
            }
        }
        return res.status(200).send({ message: 'Usuario no encontrado.' });
    }
    catch (error) {
        return res.status(500).send({ message: error });
    }
});
exports.deleteFicha = deleteFicha;
const updateFicha = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { estatura, peso, enfcardiaca, alergia, enfrespiratorias, cirugia, enfdegenerativa } = req.body;
    try {
        const result = yield db_config_1.pool.query(`SELECT informacionmedica FROM usuarios WHERE id = $1`, [id]);
        const idInf = result.rows[0].informacionmedica;
        if (result.rowCount === 1) {
            const result = yield db_config_1.pool.query(`UPDATE informacionesmedicas SET estatura = $1, peso = $2,
            enfcardiaca = $3, alergia = $4, enfrespiratorias = $5, cirugia = $6, enfdegenerativa = $7
            WHERE id = $8`, [estatura, peso, enfcardiaca, alergia, enfrespiratorias, cirugia, enfdegenerativa, idInf]);
            if (result.rowCount > 0) {
                return res.status(201).send({ message: 'Los cambios han sido correctos!' });
            }
            return res.status(400).send({ message: 'No se han cambiado los cambios' });
        }
        return res.status(400).send({ message: 'Usuario no encontrado' });
    }
    catch (error) {
        return res.status(500).send({ message: error });
    }
});
exports.updateFicha = updateFicha;
