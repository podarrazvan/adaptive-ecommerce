import * as mongoose from 'mongoose';
import { IContact } from 'src/shared/interfaces/contact.interface';
export declare const ConfigsSchema: mongoose.Schema<mongoose.Document<any, {}>, mongoose.Model<any, any>, undefined>;
export interface IConfigs {
    name: string;
    categories: string[];
    brands: string;
    shipping: any;
    program: any;
    contact: IContact;
    aboutUs: string;
    termsOfUse: string;
}
