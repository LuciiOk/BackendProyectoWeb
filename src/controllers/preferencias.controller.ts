import {Response, Request} from 'express'
import { QueryResult } from 'pg';
import { pool } from '../config/db_config'

export const getPreferencias = async (req:Request, res:Response):Promise<Response> => {
    const { id } = req.params;

    try {   
        const result:QueryResult = await pool.query(`SELECT gustos.* FROM usuarios 
        INNER JOIN gustos on usuarios.gustos = gustos.id_gustos WHERE usuarios.id = $1`, [id]);
        return res.status(200).send(result.rows[0])
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
        return res.status(403).send({message: 'Usuario no encontrado.'})
    } catch (error) {
        return res.status(500).send({message: error});
    } 
}

export const updatePreferencia = async (req:Request, res:Response) => {
    const { id } = req.params;
    let { futbol, basket , voley, salsa, zumba, folklor} = req.body;

    try {
        const result:QueryResult = await pool.query(`SELECT gustos FROM usuarios WHERE id = $1`, [id]);
        const idInfG = result.rows[0].gustos;
        if (result.rowCount === 1) {
            const result:QueryResult = await pool.query(`UPDATE gustos SET 
            futbol = $1, basket = $2, voley = $3, salsa = $4, zumba = $5, folklor = $6
            WHERE id_gustos = $7`, [futbol, basket , voley, salsa, zumba, folklor, idInfG]);

            if (result.rowCount > 0) {
                return res.status(200).send({message: 'Los cambios han sido correctos!'})
            }
            return res.status(403).send({message: 'No se han cambiado los cambios'})
        }
        return res.status(404).send({message: 'Usuario no encontrado'});
    } catch (error) {
        return res.status(500).send({message: error});
    }
}