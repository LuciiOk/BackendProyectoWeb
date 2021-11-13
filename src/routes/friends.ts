import app = require('express');
const { pool } = require('../config/db_config');
const router = app.Router();

// aqui se obtiene la lista de amigos que tiene un usuario
router.get('/', (req:any, res:any) => {
    let user = req.body;

    pool.query(`SELECT distinct amigos.nombre as amigo FROM amigos, usuarios 
        WHERE amigos.id_usuario = $1`, [user.id],
    (err:any, result:any) => {
        if (err) {
            res.status(400).send({message: err});
        }
        res.status(200)
            .send(JSON.parse(JSON.stringify(result.rows)));
    });
});

// aqui se agrega un nuevo amigo
router.post('/', (req:any, res:any) => {
    const data = req.body;

    pool.query(`INSERT INTO amigos(id_usuario, nombre)
        VALUES($1, $2) `, [data.id, data.nombre],
    (err:any, result:any) => {
        if (err) {
            res.status(400).send({message: err});
        }
        res.status(201).send({message: 'El amigo ha sido creado con exito.'});
    });
});

// eliminacion de un amigo 
router.delete('/', (req:any, res:any) => {
    const data = req.body;

    pool.query(``,
    (err:any, result:any)=>{
        if (err) {
            res.status(400).send({message: err});
        }
        res.status(202).send({message: 'El amigo ha sido eliminado'});
    });
});

export {};
module.exports = router;
