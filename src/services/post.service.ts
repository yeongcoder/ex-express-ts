import { getRepository, UpdateResult, DeleteResult, Like } from 'typeorm';
import PostModel from '../models/post.model';
import UserModel from '../models/user.model';


export default class PostService {

    // 게시글 목록조회
    async getAll(query:any): Promise<PostModel[] | Error> {

        let {
            search,
            page,
            limit
        } = query;

        if(!page) page = 1;
        if(!limit) limit = 10;
    
        try {

            const skip = ( page - 1 ) * limit;

            //  제목과 내용을 기준으로 검색 
            const where:any[] = [];
            if(search){
                where.push({
                    title: Like(`%${search}%`)
                });
                where.push({
                    desc: Like(`%${search}%`)
                });
            }

            const postList:PostModel[] = await PostModel.find({
                relations: [
                    'user'
                ],
                where,
                skip: skip,
                take: limit
            });


            return postList;

        } catch(err){
            
            throw new Error(err.message);

        }

    }

    // 게시글 상세조회
    async getOne(id:string): Promise<PostModel | undefined | Error > {

        try {

            const postDetail:PostModel | undefined = await PostModel.findOne(id, {
                relations: [
                    'user'
                ]
            });

            return postDetail;

        } catch(err){

            throw new Error(err.message || err.message);

        }

    }

    //  게시글 추가
    async add(userId:string, postDTO:any){
        try {

            const {
                title,
                desc
            } = postDTO;

            const post:PostModel = new PostModel();
            post.user = userId;
            post.title = title;
            post.desc = desc;

            await post.save();

            return;

        } catch(err){

            
            throw new Error(err.message);

        }
    }

    //  게시글 수정
    async update(userId:string, id:string, postDTO:any): Promise<number>{
        try {

            const result:UpdateResult = await PostModel.update(id, postDTO);

            return result.affected || 0;

        } catch(err){

            
            throw new Error(err.message);

        }
    }

    //  게시글 삭제
    async delete(userId:string, id:string): Promise<number>{
        try {

            const result:DeleteResult = await PostModel.delete(id);

            return result.affected || 0;

        } catch(err){

            
            throw new Error(err.message);

        }
    }
}