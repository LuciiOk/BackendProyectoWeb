import app = require('express');
const router = app.Router();
const { pool } = require('../config/db_config');
const { isAuthenticated } = require('../auth/jwtHelper');

router.get('/', isAuthenticated, (req:any, res:any) => {
    const { email } =  req.body;

    pool.query(
        `SELECT * FROM informacionesmedicas inner join usuarios
         on email = $1`, [email] , (err:any, result:any) => {
            if (err) {
                throw err;
            }
            res.send(result.rows);
        }
    );
});

router.patch('/', isAuthenticated, (req:any, res:any) => {
    const { email } =  req.body;

    pool.query(
        `SELECT * FROM informacionesmedicas inner join usuarios
         on email = $1`, [email] , (err:any, result:any) => {
            if (err) {
                throw err;
            }
            res.send(result.rows);
        }
    );
});

export {}
module.exports = router;

