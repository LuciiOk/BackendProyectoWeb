import {Response, Request} from 'express'
import { QueryResult } from 'pg';
import { pool } from '../config/db_config'

export const getUser = async (req:Request, res:Response):Promise<Response> => {
    const { id } = req.params;

    try {
        const result:QueryResult = await pool.query(`SELECT id, nombre, email, genero, fechanacimiento, informacionmedica FROM usuarios WHERE id = $1`, [id])
        return res.status(200).send(result.rows);
    } catch (error) {
        return res.send({message: error}).status(400);
    }
}

export const deleteUser = async (req:Request, res:Response):Promise<Response> => {
    const { id } = req.params;

    try {
        const result:QueryResult = await pool.query(`DELETE FROM usuarios WHERE id = $1`, [id]);

        return res.status(202).send({message: 'El usuario ha sido eliminado con exito.'});
    } catch(error) {
        return res.status(400).send({message: 'Ha ocurrido un error.'})
    }
}

export const updateUser = async (req:Request, res:Response) => {

}