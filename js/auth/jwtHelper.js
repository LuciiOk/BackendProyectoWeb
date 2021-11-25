"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.decodeToken = exports.isAuthenticated = exports.signToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
function signToken({ id, nombre, email }) {
    const user = { id, nombre, email };
    const accessToken = jsonwebtoken_1.default.sign(user, process.env.ACCESS_TOKEN_SECRET || 'un secreto'); // aqui se genera un token 
    return accessToken;
}
exports.signToken = signToken;
function isAuthenticated(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (token == null) {
        res.sendStatus(403);
    }
    jsonwebtoken_1.default.verify(token, process.env.ACCESS_TOKEN_SECRET || 'un secreto', (err, user) => {
        if (err) {
            res.sendStatus(403);
        }
        else {
            req.user = user;
            next();
        }
    });
}
exports.isAuthenticated = isAuthenticated;
;
function decodeToken(bearerToken) {
    if (bearerToken !== '') {
        let token = bearerToken.split(' ')[1];
        return jsonwebtoken_1.default.decode(token);
    }
}
exports.decodeToken = decodeToken;
