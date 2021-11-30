import {Response, Request} from 'express'
import { QueryResult } from 'pg';
import { pool } from '../config/db_config'

export const getUser = async (req:Request, res:Response):Promise<Response> => {
    const { id } = req.params;

    try {
        const result:QueryResult = await pool.query(`SELECT id, nombre, email, genero, fechanacimiento, informacionmedica FROM usuarios WHERE id = $1`, [id])
        return res.status(200).send(result.rows);
    } catch (error) {
        return res.send({message: error}).status(500);
    }
}

export const deleteUser = async (req:Request, res:Response):Promise<Response> => {
    const { id } = req.params;

    try {
        const result:QueryResult = await pool.query(`DELETE FROM usuarios WHERE id = $1`, [id]);

        return res.status(202).send({message: 'El usuario ha sido eliminado con exito.'});
    } catch(error) {
        return res.status(500).send({message: 'Ha ocurrido un error.'})
    }
}

export const updateUser = async (req:Request, res:Response):Promise<Response> => {
    const {nombre, email, genero, fechanacimiento} = req.body;
    const { id } = req.params;
    
    try {
        const result:QueryResult = await pool.query(`SELECT id FROM usuarios WHERE id = $1`, [id]);
        const resultEMAIL:QueryResult = await pool.query(`SELECT id, email FROM usuarios WHERE email = $1`, [email]);
        
        if (result.rowCount !== 0) {
            if ((resultEMAIL.rowCount === 1 && resultEMAIL.rows[0].id ===id) || resultEMAIL.rowCount === 0) {
                const result:QueryResult = await pool.query(`UPDATE usuarios SET nombre = $1,
                email = $2, fechanacimiento = $4, genero = $5 WHERE id = $3`, [nombre, email, id, fechanacimiento, genero]);
                if (result.rowCount > 0) 
                    return res.status(200).send({message: 'El usuario modificado con exito.'});
                return res.status(403).send({message: 'El usuario no ha sido modificado.'}); 
            }
            return res.status(403).send({message: 'El email ingresado ya esta siendo ocupado!'});
        }
        return res.status(404).json({message: 'El usuario no ha sido encontrado.'});
    } catch (error) {
        return res.status(500).send({message: error});
    }
}