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
exports.updatePreferencia = exports.deletePreferencia = exports.getPreferencias = void 0;
const db_config_1 = require("../config/db_config");
const getPreferencias = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const result = yield db_config_1.pool.query(`SELECT gustos.* FROM usuarios 
        INNER JOIN gustos on usuarios.gustos = gustos.id_gustos WHERE usuarios.id = $1`, [id]);
        return res.status(201).send(result.rows[0]);
    }
    catch (error) {
        return res.status(500).send({ message: error });
    }
});
exports.getPreferencias = getPreferencias;
const deletePreferencia = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        let result = yield db_config_1.pool.query(`SELECT gustos FROM usuarios WHERE id = $1`, [id]);
        if (result.rowCount > 0) {
            let gustos = result.rows[0].gustos;
            let result2 = yield db_config_1.pool.query(`DELETE FROM gustos WHERE id_gustos = $1`, [gustos]);
            if (result2.rowCount > 0) {
                return res.status(200).send({ message: 'Usuario Eliminado.' });
            }
            return res.send({ message: 'gusto no eliminado' });
        }
        return res.status(200).send({ message: 'Usuario no encontrado.' });
    }
    catch (error) {
        return res.status(500).send({ message: error });
    }
});
exports.deletePreferencia = deletePreferencia;
const updatePreferencia = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    let { futbol, basket, voley, salsa, zumba, folklor } = req.body;
    try {
        const result = yield db_config_1.pool.query(`SELECT gustos FROM usuarios WHERE id = $1`, [id]);
        const idInfG = result.rows[0].gustos;
        if (result.rowCount === 1) {
            const result = yield db_config_1.pool.query(`UPDATE gustos SET 
            futbol = $1, basket = $2, voley = $3, salsa = $4, zumba = $5, folklor = $6
            WHERE id_gustos = $7`, [futbol, basket, voley, salsa, zumba, folklor, idInfG]);
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
exports.updatePreferencia = updatePreferencia;
