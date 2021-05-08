import { Request, Response, Router, NextFunction } from 'express';
import { CREATED, OK, NOT_FOUND} from 'http-status-codes';
import { ParamsDictionary } from 'express-serve-static-core';
import verify from '../middlewares/verify';

import PostService from '../services/post.service';

const router = Router().use(verify);


//  게시글 목록조회 (검색포함)
router.get('/', async (req: Request, res:Response) => {
    const PostServiceInstance:PostService = new PostService();
    const posts = await PostServiceInstance.getAll(req.query);
    return res.status(OK).json({posts});
})

//  게시글 상세조회
router.get('/:id', async (req: Request, res:Response) => {
    const PostServiceInstance:PostService = new PostService();
    const { id } = req.params as ParamsDictionary;
    const post = await PostServiceInstance.getOne(id);
    if(!post) return res.status(NOT_FOUND).end();
    return res.status(OK).json(post);
})

//  게시글 생성
router.post('/', async (req: Request, res:Response) => {
    const postDTO:any = req.body;
    const PostServiceInstance:PostService = new PostService();
    await PostServiceInstance.add(res.locals.userId, postDTO);
    return res.status(CREATED).end();
})

// 게시글 수정
router.put('/:id', async (req: Request, res:Response) => {
    const postDTO:any = req.body;
    const PostServiceInstance:PostService = new PostService();
    const { id } = req.params as ParamsDictionary;
    const affected = await PostServiceInstance.update(res.locals.userId, id, postDTO);
    if(!affected) return res.status(NOT_FOUND).end();
    return res.status(OK).end();
})

//  게시글 삭제
router.delete('/:id', async (req: Request, res:Response) => {
    const PostServiceInstance:PostService = new PostService();
    const { id } = req.params as ParamsDictionary;
    const affected = await PostServiceInstance.delete(res.locals.userId, id);
    if(!affected) return res.status(NOT_FOUND).end();
    return res.status(OK).end();
})


export default router;