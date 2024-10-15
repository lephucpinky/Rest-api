import { Document} from "mongoose";

export interface ICustomer extends Document {
    name: string;
    email: string;
    phoneNumber?: string
    address: string;
    createAt: Date;
};
