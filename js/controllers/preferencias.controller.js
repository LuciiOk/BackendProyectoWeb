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
exports.getPreferencias = void 0;
const db_config_1 = require("../config/db_config");
const getPreferencias = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const result = yield db_config_1.pool.query(`SELECT gustos.* FROM usuarios INNER JOIN gustos on usuarios.gustos = gustos.id_gustos
        WHERE usuarios.id = $1`, [id]);
        return res.status(201).send(result.rows[0]);
    }
    catch (error) {
        return res.status(500).send({ message: error });
    }
});
exports.getPreferencias = getPreferencias;
