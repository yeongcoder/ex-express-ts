import { getConnection, getRepository, Repository } from 'typeorm';
import UserModel from '../models/user.model';
import connectdb from '../shared/connectdb';


export default class UserService {

    async getAll(): Promise<UserModel[] | Error> {

        try {

            const conn = await connectdb();

            const userList:UserModel[] = await conn.getRepository(UserModel).find();
            return userList;

        } catch(err){
            console.log(err);
            throw new Error("Unknown Error");

        }

    }

    async getOne(id:string): Promise<UserModel | Error > {

        try {

            const conn = await connectdb();

            const userDetail:UserModel | undefined = await conn.getRepository(UserModel).findOne(id);

            if(!userDetail) throw new Error("Not Found");

            return userDetail;

        } catch(err){

            console.log(err);
            throw new Error("Unknown Error");

        }

    }

    async add(userDTO:any){
        try {

            const conn = await connectdb();

            // const User = new UserModel();
            // User.uid = userDTO.uid;
            // User.pwd = userDTO.pwd;
            // User.nick_name = userDTO.nick_name;
            console.log(userDTO)
            await conn.getRepository(UserModel).insert(userDTO);

            return;

        } catch(err){

            console.log(err);
            throw new Error("Unknown Error");

        }
    }

    async update(id:string, userDTO:any){
        try {

            const conn = await connectdb();

            await conn.getRepository(UserModel).update(id, userDTO);

            return;

        } catch(err){

            console.log(err);
            throw new Error("Unknown Error");

        }
    }

    async delete(id:string){
        try {

            const conn = await connectdb();

            await conn.getRepository(UserModel).delete(id);

            return;

        } catch(err){

            console.log(err);
            throw new Error("Unknown Error");

        }
    }
}