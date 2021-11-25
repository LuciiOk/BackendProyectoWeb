import jwt from 'jsonwebtoken';

export function signToken({id, nombre, email}:any) {
    const user = {id, nombre, email};

    const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET || 'un secreto'); // aqui se genera un token 

    return accessToken;
}

export function isAuthenticated(req:any, res:any, next:any) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (token == null) {
        res.sendStatus(403);
    }

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET || 'un secreto', (err:any, user:any) => {
        if (err) {
            res.sendStatus(403);
        } else {
            req.user = user
            next();
        }
    })
};

export function decodeToken(bearerToken:string) {
    if (bearerToken !== '') {  
        let token = bearerToken.split(' ')[1];
        return jwt.decode(token);
    }
}