import { getConnection, getRepository, Repository } from 'typeorm';
import bcrypt from 'bcrypt';

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
            const { email, pwd, username } = userDTO;
            if(!email || !pwd || !username){
                new Error("missing field");
            }

            //const conn = await connectdb();

            await connectdb();

            //  중복가입 체크
            if(await this.isExist(email)){
                throw new Error("already exists email")
            }

            const user:UserModel = new UserModel();
            user.username = username;
            user.email = email;
            user.pwd = pwd;

            await user.save();

            return;

        } catch(err){

            console.log(err);
            throw new Error("Unknown Error");

        }
    }

    async update(id:string, userDTO:any){
        try {

            const conn = await connectdb();

            await conn.getRepository(UserModel).update(id, {
                username: userDTO.username
            });

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

    private async isExist(field:string | number): Promise<boolean>{
        const user:UserModel | undefined = await UserModel.findOne(field);
        return user != undefined;
    }
}