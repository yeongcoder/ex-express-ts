import { Request, Response, Router, NextFunction } from 'express';
import { BAD_REQUEST, CREATED, OK } from 'http-status-codes';

import AuthService from '../services/auth.service';

const router = Router();


//  로그인
router.post('/login', async (req: Request, res:Response) => {
    const AuthServiceInstance:AuthService = new AuthService();
    try {
        const {key, val, options} = await AuthServiceInstance.login(req.body);
        res.cookie(key, val, options);
        res.status(OK).end();
    } catch(err){
        console.log(err);
        return res.status(BAD_REQUEST).end();
    }
})

//  로그아웃
router.get('/logout', async (req: Request, res:Response) => {
    const AuthServiceInstance:AuthService = new AuthService();
    try {
        const { key } = await AuthServiceInstance.logout();
        res.clearCookie(key);
        res.status(OK).end();
    } catch(err){
        return res.status(BAD_REQUEST).end();
    }
})

export default router;