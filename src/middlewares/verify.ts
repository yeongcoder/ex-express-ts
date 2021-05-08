import express, { Request, Response, NextFunction } from 'express';
import { UNAUTHORIZED } from 'http-status-codes';
import { cookieProps } from '../shared/constants';
import { JwtService } from '../shared/jwtService';

const jwtService = new JwtService();

const authenticate = async (req: Request<any>, res: Response, next: NextFunction) => {
    try {
        // Get json-web-token
        const jwt = req.signedCookies[cookieProps.key];
        console.log("req.signedCookies: ", req.signedCookies);
        if (!jwt) {
            throw Error('JWT not present in signed cookie.');
        }
        // Make sure user role is an admin
        const userData = await jwtService.decodeJwt(jwt);

        res.locals.userId = userData.id

    } catch (err) {
        return res.status(UNAUTHORIZED).json({
            error: err.message,
        });
    }
    next();
}

export default authenticate;