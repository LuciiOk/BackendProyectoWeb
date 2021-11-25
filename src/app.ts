import { config } from './config/config';
import express from 'express'
import bodyparser from 'body-parser'
import cors from 'cors'
import morgan from 'morgan'
const app = express();

// import de las rutas
import auth from './routes/auth';
import friends  from './routes/friends';
import user from './routes/user';
import preferencias from './routes/preferencias';
import fichas from './routes/fichamedica';

// .env
require('dotenv').config();

// configuracion de app
app.use(morgan('dev'))
app.use(bodyparser.json());
app.use(cors());
app.use(express.urlencoded({extended: false}));

// declaracion de las rutas a utilizar
app.use('/auth', auth);
app.use('/fichas', fichas);
app.use('/amigos', friends);
app.use('/preferencias', preferencias);
app.use('/user', user);

// server
app.listen(config, () => {
    console.log(`Servidor corriendo en http://${config.hostname}:${config.port}`);
});
