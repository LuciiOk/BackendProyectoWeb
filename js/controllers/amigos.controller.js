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
exports.deleteAmigo = exports.addAmigo = exports.getAmigos = void 0;
const db_config_1 = require("../config/db_config");
const getAmigos = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const result = yield db_config_1.pool.query(`SELECT * FROM amigos WHERE id_usuario = $1`, [id]);
        return res.status(200).json(result.rows);
    }
    catch (error) {
        return res.status(500).json({ message: error });
    }
});
exports.getAmigos = getAmigos;
const addAmigo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id_usuario, nombre, genero } = req.body;
    try {
        const response = yield db_config_1.pool.query(`INSERT INTO amigos(id_usuario, nombre, genero) VALUES($1, $2, $3) `, [id_usuario, nombre, genero]);
        return res.status(200).json({ message: 'El amigo ha sido agregado con exito' });
    }
    catch (error) {
        return res.status(500).json({ message: error });
    }
});
exports.addAmigo = addAmigo;
const deleteAmigo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id_amigo, id_usuario } = req.params;
    try {
        const response = yield db_config_1.pool.query(`DELETE FROM amigos WHERE amigos.id_amigo = $1 AND amigos.id_usuario = $2`, [id_amigo, id_usuario]);
        return res.status(200).send({ message: 'Se ha eliminado el amigo' });
    }
    catch (error) {
        return res.status(500).send({ message: error });
    }
});
exports.deleteAmigo = deleteAmigo;
