import { Document } from "mongoose";


export interface IUser extends Document {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    role: string;

}

export interface IUserDocument extends IUser, Document {
    comparePassword: () => Promise<boolean>;
    getJwtToken: () => string;

};