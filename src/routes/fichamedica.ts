const app = require('express');
const router = app.Router();
const { pool } = require('../config/db_config')

router.get('/', (req:any, res:any) => {
    pool.query(
        `SELECT * FROM informacionesmedicas`, (err:any, result:any) => {
            if (err) {
                throw err;
            }
            res.send(result);
        }
    );
})

router.get('/:id', (req:any, res:any) => {
    const { id } =  req.body;
    
    pool.query(
        `SELECT * FROM informacionesmedicas WHERE informacionesmedicas.id = $1`, [id] , (err:any, result:any) => {
            if (err) {
                throw err;
            }
            res.send(result);
        }
    );
})

export {}

