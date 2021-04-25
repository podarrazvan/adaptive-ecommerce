import { IEmail } from './contact.model';
import { ContactService } from './contact.service';
export declare class ContactController {
    private contactService;
    constructor(contactService: ContactService);
    createEmail(data: IEmail): Promise<any>;
    getEmails(): Promise<any[]>;
    updateEmail(id: string, status: string): Promise<any>;
}
