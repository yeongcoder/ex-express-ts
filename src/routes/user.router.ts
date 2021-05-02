import { Request, Response, Router, NextFunction } from 'express';
import { BAD_REQUEST, CREATED, OK } from 'http-status-codes';
import { ParamsDictionary } from 'express-serve-static-core';
import { createConnection } from "typeorm";

import UserService from '../services/user.service';

const router = Router();


router.get('/', async (req: Request, res:Response) => {
    const UserServiceInstance:UserService = new UserService();
    try {
        const users = await UserServiceInstance.getAll();
        return res.status(OK).json({users});
    } catch(err){
        return res.status(BAD_REQUEST).end();
    }
})

router.get('/:id', async (req: Request, res:Response) => {
    const UserServiceInstance:UserService = new UserService();
    try {
        const { id } = req.params as ParamsDictionary;
        const user = await UserServiceInstance.getOne(id);
        return res.status(OK).json(user);
    } catch(err){
        return res.status(BAD_REQUEST).end();
    }
})

router.post('/', async (req: Request, res:Response) => {
    console.log("req.body:", req.body)
    const userDTO:any = req.body;
    const UserServiceInstance:UserService = new UserService();
    try {
        await UserServiceInstance.add(userDTO);
        return res.status(CREATED).end();
    } catch(err){
        return res.status(BAD_REQUEST).end();
    }
})

router.put('/:id', async (req: Request, res:Response) => {
    const userDTO:any = req.body;
    const UserServiceInstance:UserService = new UserService();
    try {
        const { id } = req.params as ParamsDictionary;
        await UserServiceInstance.update(id, userDTO);
        return res.status(OK).end();
    } catch(err){
        return res.status(BAD_REQUEST).end();
    }
})

router.delete('/:id', async (req: Request, res:Response) => {
    const UserServiceInstance:UserService = new UserService();
    try {
        const { id } = req.params as ParamsDictionary;
        await UserServiceInstance.delete(id);
        return res.status(OK).end();
    } catch(err){
        return res.status(BAD_REQUEST).end();
    }
})


export default router;