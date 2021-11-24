import { Router } from "express";
const router = Router();
import {isAuthenticated} from '../auth/jwtHelper';
import { deleteFicha, getFichas } from "../controllers/fichas.controller";
import { deletePreferencia } from "../controllers/preferencias.controller";

router.get('/:id', isAuthenticated, getFichas);

// router.put('/:id', isAuthenticated, (req:any, res:any) => {
//     const { estatura, enfermedad, enfermedadrespiratoria, cirugia, alergia, enfermedadDegenerativa } =  req.body;

//     pool.query(`SELECT * FROM usuarios WHERE usuarios.id = $1`, [req.params.id], (err:any, result:any) => {
//         if (err) {
//             res.status(400).send('error');
//         }

//         if (result.rows.length === 0) {
//             res.status(400).send('no existe el usuario');
//         }

//         const idficha = result.rows[0].informacionmedica;
//         pool.query(
//             `UPDATE informacionesmedicas 
//              set estatura = $1, enfermedad = $2, enfermedadrespiratoria = $3, cirugia = $4, alergia = $5, enfermedaddegenerativa = $6
//              WHERE id = $7`, [estatura, enfermedad, enfermedadrespiratoria, cirugia, alergia, enfermedadDegenerativa, idficha]
//              , (err:any, result:any) => {
//                 if (err) {
//                     res.status(400).send('error');
//                 }
//                 res.send('Cambios hechos');
//             }
//         );
//     });
// });

router.delete('/:id', isAuthenticated, deleteFicha);

export default router;

