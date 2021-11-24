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

const postFichas = async (req:Request, res:Response) => {
    const { estatura, enfermedad, enfermedadrespiratoria, cirugia, alergia, enfermedadDegenerativa } =  req.body;

    pool.query(`INSERT INTO informacionesmedicas(estatura, enfermedad, enfermedadrespiratoria, cirugia, alergia, enfermedaddegenerativa)
        values($1,$2,$3,$4,$5,$6) RETURNING id`,
    [estatura, enfermedad, enfermedadrespiratoria, cirugia, alergia, enfermedadDegenerativa], (err:any, result:any) => {
        if (err) {
            res.status(400);
        }
        const id = result.rows[0].id;
        console.log(id);
        pool.query(`UPDATE usuarios set informacionmedica = $1
            WHERE id = $2`, [id, req.params.id], (err:any, result:any) => {
                if (err) {
                    res.status(400)
                }
                res.status(201).send('creado');
        });
    });
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
        return res.status(200).send({message: 'Usuario no encontrado.'})
    } catch (error) {
        return res.status(500).send({message: error})
    }
}