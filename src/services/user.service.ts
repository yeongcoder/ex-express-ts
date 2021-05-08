import { UpdateResult, DeleteResult } from 'typeorm';
import UserModel from '../models/user.model';


export default class UserService {

    // 유저 목록조회
    async getAll(): Promise<UserModel[] | Error> {

        try {

            const userList:UserModel[] = await UserModel.find();
            return userList;

        } catch(err){

            throw new Error(err.message);

        }

    }

    // 유저 상세조회
    async getOne(id:string): Promise<UserModel | undefined | Error > {

        try {

            const userDetail:UserModel | undefined = await UserModel.findOne(id);

            return userDetail;

        } catch(err){

            throw new Error(err.message);

        }

    }

    //  유저 추가
    async add(userDTO:any){
        try {
            const { email, pwd, username } = userDTO;
            if(!email || !pwd || !username){
                new Error('missing field');
            }

            //  중복가입 체크
            if(await this.isExist(email)){
                throw new Error('already exists email')
            }

            const user:UserModel = new UserModel();
            user.username = username;
            user.email = email;
            user.pwd = pwd;

            await user.save();

            return;

        } catch(err){

            throw new Error(err.message);

        }
    }

    //  유저 수정
    async update(id:string, userDTO:any): Promise<UpdateResult>{
        try {

            const result:UpdateResult = await UserModel.update(id, {
                username: userDTO.username
            });

            return result

        } catch(err){

            throw new Error(err.message);

        }
    }

    //  유저 삭제
    async delete(id:string): Promise<DeleteResult>{
        try {

            const result: DeleteResult = await UserModel.delete(id);

            return result;

        } catch(err){

            throw new Error(err.message);

        }
    }

    private async isExist(field:string | number): Promise<boolean>{
        const user:UserModel | undefined = await UserModel.findOne(field);
        return user != undefined;
    }
}