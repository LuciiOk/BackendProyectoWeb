"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const { pool } = require('../config/db_config');
class User {
    getUserById(id) {
        return pool.query(`SELECT id, nombre, email, genero, fechanacimiento, informacionmedica FROM usuarios WHERE id = $1`, [id]);
    }
    deleteUserById(id) {
        return pool.query(`DELETE FROM usuarios WHERE id = $1`, [id]);
    }
}
exports.User = User;
