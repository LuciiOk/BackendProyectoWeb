import e from "express";

const jwt = require('jsonwebtoken');

module.exports = (req:any, res:any, next:any) => {
    const token = req.headers.authorization;
    if (!token) {
        res.sendStatus(403);
    }

    jwt.verify(token, 'secreKey', (err:any, decoded:any) => {
        if (err) {
            res.sendStatus(403);
        } else {
            let { email } = decoded; 
            req.email = email;
            req.token = token;
            next();
        }
    })
};