"use strict";
const jwt = require('jsonwebtoken');
function signToken({ id, nombre, email }) {
    const user = { id, nombre, email };
    const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET); // aqui se genera un token 
    return accessToken;
}
function isAuthenticated(req, res, next) {
    const token = req.headers.authorization;
    if (!token) {
        res.sendStatus(403);
    }
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
        if (err) {
            res.sendStatus(403);
        }
        else {
            let { email } = decoded;
            req.email = email;
            req.token = token;
            next();
        }
    });
}
;
module.exports = { signToken, isAuthenticated };
