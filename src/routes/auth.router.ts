import { Request, Response, Router, NextFunction } from 'express';
import { BAD_REQUEST, CREATED, OK, UNAUTHORIZED } from 'http-status-codes';

import AuthService from '../services/auth.service';

const router = Router();


//  로그인
router.post('/login', async (req: Request, res:Response) => {
    const AuthServiceInstance:AuthService = new AuthService();
    try {
        const {key, val, options} = await AuthServiceInstance.login(req.body);
        res.cookie(key, val, options);
    } catch(err){
        return res.status(UNAUTHORIZED).end();
    }

    res.status(OK).end();
})

//  로그아웃
router.get('/logout', async (req: Request, res:Response) => {
    const AuthServiceInstance:AuthService = new AuthService();
    const { key } = await AuthServiceInstance.logout();
    res.clearCookie(key);
    res.status(OK).end();
})

export default router;