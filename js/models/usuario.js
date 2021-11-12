"use strict";
const mongoose = require('mongoose');
const schema = mongoose.Schema;
const usuario = mongoose.model('Usuario', new schema({
    nombre: String,
    usario: String,
    pass: String
}));
module.exports = usuario;
