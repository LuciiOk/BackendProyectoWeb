import {Response, Request} from 'express'
import { QueryResult } from 'pg';
import { pool } from '../config/db_config'

export const getPreferencias = async (req:Request, res:Response):Promise<Response> => {
    const { id } = req.params;

    try {   
        const result:QueryResult = await pool.query(`SELECT gustos.* FROM usuarios INNER JOIN gustos on usuarios.gustos = gustos.id_gustos
        WHERE usuarios.id = $1`, [id]);
        return res.status(201).send(result.rows[0])
    } catch (error) {
        return res.status(500).send({message: error})
    }
}