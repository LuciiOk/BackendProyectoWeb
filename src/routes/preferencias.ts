import app = require('express');
const { pool } = require('../config/db_config');
const { isAuthenticated } =  require('../auth/jwtHelper')
const router = app.Router();

router.get('/', (req:any, res:any) => {
    const { id } = req.body;

    pool.query(`SELECT bailes.*, deportes.* FROM usuarios
        inner join usuario_baile on usuario_baile.id_usuario = usuarios.id
        inner join bailes on usuario_baile.id_baile = bailes.id_baile
        inner join usuario_deporte on usuario_deporte.id_deporte = usuarios.id
        inner join deportes on usuario_deporte.id_deporte = deportes.id_deporte
        where usuarios.id = $1`, [id], (err:any, result:any) => {
        if (err) {
            res.status().send({message: err})
        }
        res.status(200).send(result.rows)
    });
});

router.post('/',isAuthenticated, (req:any, res:any) => {
    pool.query(``,)
});

router.delete('/',isAuthenticated, (req:any, res:any) => {
    pool.query(``,)
});

router.put('/',isAuthenticated, (req:any, res:any) => {
    pool.query(``,)
});

export {};
module.exports = router;
