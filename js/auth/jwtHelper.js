"use strict";
const jwt = require('jsonwebtoken');
function signToken({ id, nombre, email }) {
    const user = { id, nombre, email };
    const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET); // aqui se genera un token 
    return accessToken;
}
function isAuthenticated(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (token == null) {
        res.sendStatus(403);
    }
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if (err) {
            res.sendStatus(403);
        }
        else {
            //req.user = user;
            next();
        }
    });
}
;
module.exports = { signToken, isAuthenticated };
