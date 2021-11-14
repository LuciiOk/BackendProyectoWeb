const express = require('express');
const bodyparser = require('body-parser');
const cors = require('cors');
const app = express();
const auth = require('./routes/auth');
const friends = require('./routes/friends');
const { config } = require('./config/config');
const fichas = require('./routes/fichamedica');
require('dotenv').config();

const PORT =  process.env.PORT || 3000;

app.use(bodyparser.json());
app.use(cors());
app.use(express.urlencoded({extended: false}));

app.use('/auth', auth);
app.use('/fichas', fichas);
app.use('/amigos', friends);

app.listen(config, () => {
    console.log(`Servidor corriendo en http://${config.hostname}:${config.port}`);
});

export {}