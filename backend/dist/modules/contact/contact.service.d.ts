import { Model } from 'mongoose';
import { IEmail } from './contact.model';
export declare class ContactService {
    private contactModel;
    constructor(contactModel: Model<any>);
    createEmail(data: IEmail): Promise<any>;
    getEmails(): Promise<any[]>;
    updateEmail(_id: string, status: string): Promise<any>;
}
