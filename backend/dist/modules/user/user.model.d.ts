import * as mongoose from 'mongoose';
export declare const UserSchema: mongoose.Schema<mongoose.Document<any, {}>, mongoose.Model<any, any>, undefined>;
export interface IUser {
    name?: string;
    username?: string;
    email?: string;
    password?: string;
    favorites?: string[];
    history: string[];
    lastVisit: Date;
    categories: string[];
    isActive?: boolean;
    token?: string;
}
