"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("./config/config");
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const morgan_1 = __importDefault(require("morgan"));
const app = (0, express_1.default)();
// import de las rutas
const auth_1 = __importDefault(require("./routes/auth"));
const friends_1 = __importDefault(require("./routes/friends"));
const user_1 = __importDefault(require("./routes/user"));
const preferencias_1 = __importDefault(require("./routes/preferencias"));
const fichamedica_1 = __importDefault(require("./routes/fichamedica"));
// .env
require('dotenv').config();
// configuracion de app
app.use((0, morgan_1.default)('dev'));
app.use(body_parser_1.default.json());
app.use((0, cors_1.default)());
app.use(express_1.default.urlencoded({ extended: false }));
// declaracion de las rutas a utilizar
app.use('/auth', auth_1.default);
app.use('/fichas', fichamedica_1.default);
app.use('/amigos', friends_1.default);
app.use('/preferencias', preferencias_1.default);
app.use('/user', user_1.default);
// server
app.listen(config_1.config, () => {
    console.log(`Servidor corriendo en http://${config_1.config.hostname}:${config_1.config.port}`);
});
