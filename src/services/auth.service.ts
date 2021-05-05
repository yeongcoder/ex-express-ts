import { getConnection, getRepository, Repository } from 'typeorm';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

import connectdb from '../shared/connectdb';
import UserModel from '../models/user.model';
import { JwtService } from '../shared/jwtService';
import { paramMissingError, loginFailedErr, cookieProps } from '../shared/constants';


export default class AuthService {

    // 로그인
    async login(authDTO:any): Promise<any> {

        try {
            const jwtService = new JwtService();

            const { email, pwd } = authDTO;
            if(!email || !pwd){
                throw new Error(paramMissingError);
            }

            const conn = await connectdb();

            //  유저조회
            const user:UserModel = await conn.getRepository(UserModel).findOne({
                where: {
                    email
                }
            });
            if(!user){
                throw new Error(loginFailedErr);
            }

            //  비밀번호 체크
            const pwdPassed = await bcrypt.compare(pwd, user.pwd);
            if (!pwdPassed) {
                throw new Error(loginFailedErr);
            }

            //  로그인토큰 발급
            const loginToken = await jwtService.getJwt({
                id: user.id
            });
            const { key, options } = cookieProps;

            return {
                key: key,
                val: loginToken,
                options: options
            }

        } catch(err){

            console.log(err);
            throw new Error("Unknown Error");

        }

    }


    //  로그아웃
    async logout(){
        try {

            const { key, options } = cookieProps;

            return {
                key,
                options
            }

        } catch(err){

            console.log(err);
            throw new Error("Unknown Error");

        }
    }
}