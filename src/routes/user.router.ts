import { Request, Response, Router, NextFunction } from 'express';
import { CREATED, OK, NOT_FOUND, BAD_REQUEST } from 'http-status-codes';
import { ParamsDictionary } from 'express-serve-static-core';
import verify from '../middlewares/verify';

import UserService from '../services/user.service';

const router = Router().use(verify);


//  유저 목록조회
router.get('/', async (req: Request, res:Response) => {
    const UserServiceInstance:UserService = new UserService();
    const users = await UserServiceInstance.getAll();
    return res.status(OK).json({users});
})

//  유저 상세조회
router.get('/:id', async (req: Request, res:Response) => {
    const UserServiceInstance:UserService = new UserService();
    const { id } = req.params as ParamsDictionary;
    const user = await UserServiceInstance.getOne(id);
    if(!user) return res.status(NOT_FOUND).end();
    return res.status(OK).json(user);
})

//  회원가입
router.post('/', async (req: Request, res:Response) => {
    const userDTO:any = req.body;
    const UserServiceInstance:UserService = new UserService();
    await UserServiceInstance.add(userDTO);
    return res.status(CREATED).end();
})

// 유저 수정
router.put('/:id', async (req: Request, res:Response) => {
    //  수정을 요청한 유저가 수정될 유저가 아닌경우
    if(res.locals.userId != req.params.id){
        return res.status(BAD_REQUEST).end();
    }
    const userDTO:any = req.body;
    const UserServiceInstance:UserService = new UserService();
    const { id } = req.params as ParamsDictionary;
    const { affected } =await UserServiceInstance.update(id, userDTO);
    if(!affected) return res.status(NOT_FOUND).end();
    return res.status(OK).end();
})

//  회원탈퇴
router.delete('/:id', async (req: Request, res:Response) => {
    //  탈퇴를 요청한 유저가 탈퇴될 유저가 아닌경우
    if(res.locals.userId != req.params.id){
        return res.status(BAD_REQUEST).end();
    }
    const UserServiceInstance:UserService = new UserService();
    const { id } = req.params as ParamsDictionary;
    const { affected } =await UserServiceInstance.delete(id);
    if(!affected) return res.status(NOT_FOUND).end();
    return res.status(OK).end();
})


export default router;