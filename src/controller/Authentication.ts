import express from 'express';
import { createUser, getUserByEmail } from '../models/user.model';
import { authentication, random } from '../helper';



export const login = async (req: express.Request, res: express.Response) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).send('Thiếu thông tin email hoặc mật khẩu'); 
        }
        const user = await getUserByEmail(email).select('+authentication.salt +authentication.password');
        if (!user) {
            return res.status(400).send('Không tìm thấy người dùng'); 
        }
        const expectedHash = authentication(user.authentication?.salt ?? '', password);
        if (user.authentication?.password !== expectedHash) {
            return res.status(403).send('Mật khẩu không đúng'); 
        }
        const salt = random();
        user.authentication.sessionToken = authentication(salt, user._id.toString());
        await user.save();

        res.cookie('HONG-AUTH', user.authentication.sessionToken, { domain: 'localhost', path: '/' });
        return res.status(200).json(user).end(); 
    } catch (error) {
        console.error(error); // Ghi log lỗi ra console
        return res.status(500).send('Đã xảy ra lỗi'); 
    }
};


//register
export const register = async (req: express.Request, res: express.Response) => {
    try {
        const {email, telephone , password, username} = req.body;

        if(!email || !telephone || !password || !username) {
            return  res.sendStatus(400);
        }
        const exitingUser = await getUserByEmail(email);
        if(exitingUser){
            return  res.sendStatus(400);
        }
        const salt = random();
        const user = await createUser({
            email,
            username,
            telephone,
            authentication: {
                salt,
                password: authentication(salt, password),
            },
        });


        return res.status(200).json(user).end();

        
    } catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
}