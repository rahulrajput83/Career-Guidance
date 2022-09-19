import { NextFunction, Request, Response } from 'express'
import * as jwt from 'jsonwebtoken';

export class AuthController {
    public verifyToken(req: Request, res: Response, next: NextFunction) {
        const authHeader = req.headers['authorization'];
        if(typeof authHeader != 'undefined') {
            const token = authHeader && authHeader.split(' ')[1];
            if (token == null) {
                return res.sendStatus(401);
            }

            jwt.verify(token, process.env.TOKEN_SECRET as string, (err: any, user: any) => {
                if (err) {
                    return res.sendStatus(403);
                }
                req.body.id = user.id;
                return next();
            });
        } else {
            return res.sendStatus(401);
        }
    }
}