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
exports.updateUser = exports.deleteUser = exports.getUser = void 0;
const db_config_1 = require("../config/db_config");
const getUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const result = yield db_config_1.pool.query(`SELECT id, nombre, email, genero, fechanacimiento, informacionmedica FROM usuarios WHERE id = $1`, [id]);
        return res.status(200).send(result.rows);
    }
    catch (error) {
        return res.send({ message: error }).status(400);
    }
});
exports.getUser = getUser;
const deleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const result = yield db_config_1.pool.query(`DELETE FROM usuarios WHERE id = $1`, [id]);
        console.log(result);
        return res.status(202).send({ message: 'El usuario ha sido eliminado con exito.' });
    }
    catch (error) {
        return res.status(400).send({ message: 'Ha ocurrido un error.' });
    }
});
exports.deleteUser = deleteUser;
const updateUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
});
exports.updateUser = updateUser;
