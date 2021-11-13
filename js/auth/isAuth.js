"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jwt = require('jsonwebtoken');
module.exports = (req, res, next) => {
    const token = req.headers.authorization;
    if (!token) {
        res.sendStatus(403);
    }
    jwt.verify(token, 'secreKey', (err, decoded) => {
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
};
