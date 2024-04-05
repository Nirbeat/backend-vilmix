import jwt from 'jsonwebtoken';
import { config } from 'dotenv';
config();

export function generateToken(user){

    const token = jwt.sign(user, process.env.JWT_KEY, { expiresIn: 600});
    return token;
}

export function authToken(req, res, next){

    const authHeader = req.headers.authorization;

    if(!authHeader) return res.status(401).json({error : 'No autenticado'});

    const token = authHeader.split(' ')[1];

    jwt.verify(token, process.env.JWT_KEY, (error, credentials) => {
        if(error) console.log(error)
        // return res.status(401).json({error : 'No autorizado'});

        delete credentials.password;
        req.user = credentials;
    })
    next()
}