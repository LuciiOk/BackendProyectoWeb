import { pool } from '../config/db_config'
import {Request, Response} from 'express'
import { QueryResult } from 'pg';

export const getAmigos = async (req:Request, res:Response):Promise<Response> => {
    const { id } = req.params;
    try {
        const result:QueryResult = await pool.query(`SELECT * FROM amigos WHERE id_usuario = $1`, [id]);
        return res.status(200).json(result.rows);
    } catch(error) {
        return res.status(500).json({message: error});
    }
}

export const addAmigo = async (req:Request, res:Response):Promise<Response> => {
    const { id_usuario, nombre, genero } = req.body;

    try {
        const response:QueryResult = await pool.query(`INSERT INTO amigos(id_usuario, nombre, genero) VALUES($1, $2, $3) `, [id_usuario, nombre, genero]);
        return res.status(201).json({message: 'El amigo ha sido agregado con exito'});
    } catch (error) {
        return res.status(500).json({message: error});
    }
}

export const deleteAmigo = async (req:Request, res:Response):Promise<Response> => {
    const { id_amigo, id_usuario } = req.params;

    try {
        const response:QueryResult = await pool.query(`DELETE FROM amigos WHERE amigos.id_amigo = $1 AND amigos.id_usuario = $2`, [id_amigo, id_usuario]);
        return res.status(200).send({message: 'Se ha eliminado el amigo'});
    } catch (error) {
        return res.status(500).send({message: error});
    }
}