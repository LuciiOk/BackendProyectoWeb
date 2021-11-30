import { pool } from '../config/db_config';
import bcrypt from 'bcrypt';
import  jsonwebtoken  from 'jsonwebtoken';
import { QueryResult } from 'pg';
import { Request, Response } from 'express';
const jwt = jsonwebtoken;
import { signToken } from '../auth/jwtHelper';
require('dotenv').config();

export const registrar = async (req:Request, res:Response):Promise<Response>  => {
    let { nombre, email, password, genero, fechanacimiento, infoMedica, gustos} = req.body;
    let { estatura, peso , enfcardiaca, alergia, enfrespiratorias, cirugia, enfdegenerativa} = infoMedica;
    let { futbol, basket , voley, salsa, zumba, folklor} = gustos;
    
    try {
        let hashedPass = await bcrypt.hash(password, 10);

        const result:QueryResult = await pool.query(`SELECT * FROM usuarios WHERE email = $1`, [email]);
        console.log(result)                                                           
        if (result.rowCount === 0 ) {
            const result2:QueryResult = await pool.query(`INSERT INTO usuarios(nombre, email, password, genero, fechaNacimiento)
             VALUES($1,$2,$3,$4,$5) RETURNING id`, [nombre, email, hashedPass, genero, fechanacimiento]);

            let idUsuario = parseInt(result2.rows[0].id);
            
            let infM:QueryResult = await pool.query(`INSERT INTO informacionesmedicas(estatura, peso, enfCardiaca, alergia, enfRespiratorias, cirugia, enfDegenerativa)
             values($1,$2,$3,$4,$5,$6,$7) RETURNING id`, [estatura, parseInt(peso), enfcardiaca, alergia, enfrespiratorias, cirugia, enfdegenerativa]);

            let idF = infM.rows[0].id;

            let gustosResult:QueryResult = await pool.query(`INSERT INTO gustos(folklor, salsa, zumba, futbol, basket, voley) 
             values($1,$2,$3,$4,$5,$6) RETURNING id_gustos`, [folklor, salsa, zumba, futbol, basket, voley]);

            let idG = gustosResult.rows[0].id_gustos;

            let update = await pool.query(`UPDATE usuarios set informacionmedica = $1, gustos = $2 WHERE id = $3`, [idF, idG, idUsuario]);
            return res.status(201).send({message: 'El usuario ha sido creado con exito!'})
        }
        return res.status(403).send({message: 'El email ya existe'});
    } catch (error) {
        return res.status(500).send({message: error});
    }
}

export const login = async (req:Request, res:Response):Promise<Response> => {
    let { email, pass } = req.body;

    try {
        const result: QueryResult = await pool.query(`SELECT * FROM usuarios WHERE usuarios.email = $1`, [email]);
        if (result.rowCount !== 0) {
            let validPass = await bcrypt.compare(pass, result.rows[0].password);

            if (!validPass) 
                return res.status(401).send({message: "usuario o contrasena incorrecta"});
                
            let accessToken = signToken(result.rows[0]);
    
            let data = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET || 'unsecreto');

            return  res.status(202).header('authorization', 'Bearer ' + accessToken).send({token: accessToken, user: data});
        }
        return res.status(401).send({message: 'Usuario o contraseña incorrecta.'})

    } catch (error) {
        return res.status(500).send({message: error});
    }
}