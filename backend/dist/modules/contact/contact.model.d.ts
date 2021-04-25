import * as mongoose from 'mongoose';
export declare const EmailSchema: mongoose.Schema<mongoose.Document<any, {}>, mongoose.Model<any, any>, undefined>;
export interface IEmail {
    name: string;
    email: string;
    subject: string;
    message: string;
    date: Date;
    seen: string;
}
