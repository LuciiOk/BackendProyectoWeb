const { pool } = require('../config/db_config');
export class User {

    getUserById (id: any) {

     return pool.query(`SELECT id, nombre, email, genero, fechanacimiento, informacionmedica FROM usuarios WHERE id = $1`, [id]);
    }
    
    deleteUserById (id: any) {
        return pool.query(`DELETE FROM usuarios WHERE id = $1`, [id]);
    }
    
}