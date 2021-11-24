import { Router } from "express";
const router = Router();
const { pool } = require('../config/db_config');
import {isAuthenticated} from '../auth/jwtHelper';
import { getFichas } from "../controllers/fichas.controller";

router.get('/:id', isAuthenticated, getFichas);

router.post('/:id', (req:any, res:any) => {
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
});

router.put('/:id', isAuthenticated, (req:any, res:any) => {
    const { estatura, enfermedad, enfermedadrespiratoria, cirugia, alergia, enfermedadDegenerativa } =  req.body;

    pool.query(`SELECT * FROM usuarios WHERE usuarios.id = $1`, [req.params.id], (err:any, result:any) => {
        if (err) {
            res.status(400).send('error');
        }

        if (result.rows.length === 0) {
            res.status(400).send('no existe el usuario');
        }

        const idficha = result.rows[0].informacionmedica;
        pool.query(
            `UPDATE informacionesmedicas 
             set estatura = $1, enfermedad = $2, enfermedadrespiratoria = $3, cirugia = $4, alergia = $5, enfermedaddegenerativa = $6
             WHERE id = $7`, [estatura, enfermedad, enfermedadrespiratoria, cirugia, alergia, enfermedadDegenerativa, idficha]
             , (err:any, result:any) => {
                if (err) {
                    res.status(400).send('error');
                }
                res.send('Cambios hechos');
            }
        );
    });
});

router.delete('/:id',isAuthenticated, (req:any, res:any) => {
    let { id } = req.params

    pool.query(`SELECT informacionmedica FROM usuarios where id = $1`, [id], (err:any, result:any) => {
        if (err) {
            if (err) {
                res.status(400).send({message: 'ha ocurrido un error'});
            }
        }   
    
        let infoM = result.rows[0].informacionmedica
        console.log();
        pool.query(`DELETE FROM informacionesmedicas WHERE id = $1`, [parseInt(infoM)], (err:any, result:any) => {
            if (err) {
                res.status(400).send({message: 'ha ocurrido un error'});
            }
            res.status(202).send({message: 'La informacion medica se han eliminado con exito'})
        })
    });

});

export default router;

