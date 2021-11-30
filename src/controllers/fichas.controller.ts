import {Response, Request} from 'express';
import { QueryResult } from 'pg';
import { pool } from '../config/db_config';

export const getFichas = async (req:Request, res:Response):Promise<Response> => {
    const { id } =  req.params;

    try {
        const result:QueryResult = await pool.query(`SELECT informacionesmedicas.* FROM informacionesmedicas 
            JOIN usuarios ON informacionesmedicas.id = usuarios.informacionmedica WHERE usuarios.id = $1`, [ id ]);
        return res.status(200).send(result.rows[0]);
    } catch (error) {
        return res.status(500).send({message: error});
    }
}

export const deleteFicha = async (req:Request, res:Response):Promise<Response> => {
    let { id } = req.params
    console.log(id);
    try {
        let result: QueryResult = await pool.query(`SELECT informacionmedica FROM usuarios where id = $1`, [id]);
        if (result.rowCount > 0) {
            let infoM = result.rows[0].informacionmedica;

            result = await pool.query(`DELETE FROM informacionesmedicas WHERE id = $1`, [infoM]);

            if (result.rowCount > 0) {
                return res.status(200).send({message: 'Ficha Eliminada.'});
            }
        }
        return res.status(404).send({message: 'Usuario no encontrado.'})
    } catch (error) {
        return res.status(500).send({message: error})
    }
}

export const updateFicha = async (req:Request, res:Response) => {
    const {id} = req.params;
    const { estatura, peso , enfcardiaca, alergia, enfrespiratorias, cirugia, enfdegenerativa} = req.body;

    try {
        const result:QueryResult = await pool.query(`SELECT informacionmedica FROM usuarios WHERE id = $1`, [id]);
        const idInf = result.rows[0].informacionmedica;
        if (result.rowCount === 1) {
            const result:QueryResult = await pool.query(`UPDATE informacionesmedicas SET estatura = $1, peso = $2,
            enfcardiaca = $3, alergia = $4, enfrespiratorias = $5, cirugia = $6, enfdegenerativa = $7
            WHERE id = $8`, [estatura, peso, enfcardiaca, alergia, enfrespiratorias, cirugia, enfdegenerativa, idInf]);

            if (result.rowCount > 0) {
                return res.status(200).send({message: 'Los cambios han sido correctos!'})
            }
            return res.status(404).send({message: 'No se han cambiado los cambios'})
        }
        return res.status(404).send({message: 'Usuario no encontrado'});
    } catch (error) {
        return res.status(500).send({message: error});
    }
}