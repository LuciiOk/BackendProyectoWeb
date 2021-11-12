const express = require('express');
const bodyparser = require('body-parser');
const cors = require('cors');
const app = express();
const users = require('./routes/users');
const auth = require('./routes/auth');
require('dotenv').config();

const PORT =  process.env.PORT || 3000;

app.use(bodyparser.json());
app.use(cors());
app.use(express.urlencoded({extends: false}));

app.use('/users', users);
app.use('/auth', auth);

app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});

export {};
module.exports = app;