"use strict";
const jwt = require('jsonwebtoken');
function verifyToken(req, res, next) {
    const token = req.header.authorization;
    if (!token) {
        res.sendStatus(403);
    }
    jwt.verifyToken(token, 'secretKey', (err, decoded) => {
        const { email } = decoded;
        res.send(email);
    });
}
