const express = require('express');
const bodyparser = require('body-parser');
const cors = require('cors');
const app = express();
const auth = require('./routes/auth');
const friends = require('./routes/friends');
const fichas = require('./routes/fichamedica');
require('dotenv').config();

const PORT =  process.env.PORT || 3000;

app.use(bodyparser.json());
app.use(cors());
app.use(express.urlencoded({extends: false}));

app.use('/auth', auth);
app.use('/fichas', fichas);
app.use('/amigos', friends);

app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});

export {};
module.exports = app;