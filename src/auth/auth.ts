const jwt = require('jsonwebtoken');

function verifyToken(req:any, res:any, next:any) {
    const token = req.header.authorization;
    if (!token) {
        res.sendStatus(403);
    }
    jwt.verifyToken(token, 'secretKey', (err:any, decoded:any) => {
        const { email } = decoded 

        res.send(email);
    })
}