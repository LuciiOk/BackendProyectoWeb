const app = require('express');
const bcrypt = require('bcrypt');
const { pool } = require('../config/db_config')
const router = app.Router();


router.post('/', async (req:any, res:any)  => {
    let { user, email, pass, pass2} = req.body;

    let hashedPass = await bcrypt.hash(pass, 10)

    pool.query(
        `SELECT * FROM usuarios
        WHERE email = $1
        `, [email], (err:any, result:any) => {
            if (err) {
                throw err;
            }
            if (result.rows.length > 0) {
                res.send('El email ya existe');
            } else {
                pool.query(`INSERT INTO usuarios(nombre, email, password) VALUES($1,$2,$3) RETURNING id, password`, [user, email, hashedPass], (err:any, result:any) => {
                    if (err) {
                        throw err;
                    }
                    res.send("Usuario creado con exito.");
                })
            }
        }
    )

    console.log(user, email, pass, pass2, hashedPass);
});

export{};
module.exports = router;