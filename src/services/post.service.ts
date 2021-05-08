import { UpdateResult, DeleteResult, Like } from 'typeorm';
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

        if(!search) search = '.*';
        if(!page) page = 1;
        if(!limit) limit = 10;
    
        try {

            const skip = ( page - 1 ) * limit;

            const postList:PostModel[] = await PostModel.find({
                relations: [
                    'user_id'
                ],
                //  제목과 내용을 기준으로 검색 
                where: [
                    {
                        title: Like(`%${search}%`)
                    },
                    {
                        desc: Like(`%${search}%`)
                    }
                ],
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
                    'user_id'
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
            post.user_id = userId;
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

            // 게시글 작성자인지 확인
            const postWillUpdated:PostModel | undefined = await PostModel.findOne(id);
            if(postWillUpdated && postWillUpdated.user_id != userId){
                return 0;
            }

            const result:UpdateResult = await PostModel.update(id, postDTO);

            return result.affected || 0;

        } catch(err){

            
            throw new Error(err.message);

        }
    }

    //  게시글 삭제
    async delete(userId:string, id:string): Promise<number>{
        try {

            // 게시글 작성자인지 확인
            const postWillUpdated:PostModel | undefined = await PostModel.findOne(id);
            if(postWillUpdated && postWillUpdated.user_id != userId){
                return 0;
            }

            const result:DeleteResult = await PostModel.delete(id);

            return result.affected || 0;

        } catch(err){

            
            throw new Error(err.message);

        }
    }
}