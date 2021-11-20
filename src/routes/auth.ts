import app = require('express');
const bcrypt = require('bcrypt');
const { pool } = require('../config/db_config');
const router = app.Router();
const jwt = require('jsonwebtoken');
const { signToken } = require('../auth/jwtHelper')

router.post('/register', async (req:any, res:any)  => {
    let { nombre, email, password, sexo, nacimiento } = req.body;

    let hashedPass = await bcrypt.hash(password, 10);

    pool.query(`SELECT * FROM usuarios WHERE email = $1
    `, [email], (err:any, result:any) => {
        if (err) {
            res.status(400).send({messagge: 'error'})
        }

        if (result.rows.length > 0) {
            res.status(400).send({message: 'El email ya existe'});
        } else {
            pool.query(`INSERT INTO usuarios(nombre, email, password, genero, fechaNacimiento) VALUES($1,$2,$3,$4,$5) RETURNING id, password`, 
            [nombre, email, hashedPass, sexo, nacimiento],
            (err:any, result:any) => {
                if (err) {
                    res.status(400).send({messagge: 'error'})
                }
                res.status(200).send({message: 'Usuario creado con exito.'});
            })
        }
    });
});

router.post('/login', (req:any, res:any) => {
    let { email, pass } = req.body;

    pool.query(`SELECT * FROM usuarios WHERE usuarios.email = $1`, [email], async (err:any, result:any) => {
        // validar que el usuario exista
        if (result.rows.length === 0) 
            return res.status(401).send({message: "usuario o contrasena incorrecta"});

        let validPass = await bcrypt.compare(pass, result.rows[0].password);
        // validar contrasena
        if (!validPass) 
            return res.status(401).send({message: "usuario o contrasena incorrecta"});
        // generar jwt
        let accessToken = signToken(result.rows[0]);
        
        jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET, (err:any, data:any) =>{
            res.header('authorization', 'Bearer ' + accessToken).send({token: accessToken, user: data});
        });
    });
});



export{};
module.exports = router;