"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require('express');
const bodyparser = require('body-parser');
const cors = require('cors');
const app = express();
const { config } = require('./config/config');
// import de las rutas
const auth = require('./routes/auth');
const friends = require('./routes/friends');
const fichas = require('./routes/fichamedica');
const preferencias = require('./routes/preferencias');
// .env
require('dotenv').config();
const PORT = process.env.PORT || 3000;
// configuracion de app
app.use(bodyparser.json());
app.use(cors());
app.use(express.urlencoded({ extended: false }));
// declaracion de las rutas a utilizar
app.use('/auth', auth);
app.use('/fichas', fichas);
app.use('/amigos', friends);
app.use('/preferencias', preferencias);
// server
app.listen(config, () => {
    console.log(`Servidor corriendo en http://${config.hostname}:${config.port}`);
});
