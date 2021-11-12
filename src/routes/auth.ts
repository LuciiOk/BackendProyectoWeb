const app = require('express');
const bcrypt = require('bcrypt');
const { pool } = require('../config/db_config')
const router = app.Router();


router.post('/register', async (req:any, res:any)  => {
    let { user, email, pass, pass2 , genero, fechaNacimiento} = req.body;

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
                pool.query(`INSERT INTO usuarios(nombre, email, password, genero, fechaNacimiento) VALUES($1,$2,$3,$4,$5) RETURNING id, password`, 
                [user, email, hashedPass, genero, fechaNacimiento],
                (err:any, result:any) => {
                    if (err) {
                        throw err;
                    }
                    res.send("Usuario creado con exito.");
                })
            }
        }
    )
});

router.post('/login', (req:any, res:any) => {
    let { email, pass } = req.body;

    pool.query(`SELECT * FROM usuarios WHERE usuarios.email = $1`, [email], async (err:any, result:any) => {
        if (result.rows.length === 0) 
            return res.status(401).send({message: "usuario o contrasena incorrecta"});

        let validPass = await bcrypt.compare(pass, result.rows[0].password);

        if (!validPass) 
            return res.status(401).send({message: "usuario o contrasena incorrecta"});
        return res.status(200).send({message: "success"})
    });
});

export{};
module.exports = router;