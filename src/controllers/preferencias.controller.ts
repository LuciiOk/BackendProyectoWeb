import {Response, Request} from 'express'
import { QueryResult } from 'pg';
import { pool } from '../config/db_config'

export const getPreferencias = async (req:Request, res:Response):Promise<Response> => {
    const { id } = req.params;

    try {   
        const result:QueryResult = await pool.query(`SELECT gustos.* FROM usuarios INNER JOIN gustos on usuarios.gustos = gustos.id_gustos
        WHERE usuarios.id = $1`, [id]);
        console.log(result);
        return res.status(201).send(result.rows[0])
    } catch (error) {
        return res.status(500).send({message: error})
    }
}

export const deletePreferencia = async (req:Request, res:Response):Promise<Response> => {
    const { id } = req.params;

    try {
        let result:QueryResult = await pool.query(`SELECT gustos FROM usuarios WHERE id = $1`, [id]);
        
        if (result.rowCount > 0) {
            let gustos = result.rows[0].gustos;
        
            let result2 = await pool.query(`DELETE FROM gustos WHERE id_gustos = $1`, [gustos]);

            if (result2.rowCount > 0) {
                return res.status(200).send({message: 'Usuario Eliminado.'});
            }
            return res.send({message: 'gusto no eliminado'})
        }
        return res.status(200).send({message: 'Usuario no encontrado.'})
    } catch (error) {
        return res.status(500).send({message: error});
    } 
}