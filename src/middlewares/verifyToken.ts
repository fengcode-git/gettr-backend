import express from 'express';
import jwt from 'jsonwebtoken'
import config from '../utils/config';

export default async function verifyToken(req: express.Request, res: express.Response, next: express.NextFunction) {
    /*
    * TOKEN格式
    * Authorization: Bearer <token> 
    */
    const bearerHeader = req.headers['authorization']
    if (bearerHeader == null) {
        res.sendStatus(403)
    } else {
        const bearer = bearerHeader.split(' ')
        const token = bearer[1]
        if (token == null) {
            res.sendStatus(401)
        } else {
            jwt.verify(token, config.app.key, (err, user) => {
                if (err) {
                    res.sendStatus(403)
                } else {
                    req.user = user as ITokenUser
                    next()
                }
            })
        }
    }
}