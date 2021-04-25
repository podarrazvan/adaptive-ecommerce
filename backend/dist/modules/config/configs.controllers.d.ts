import { IBrand } from 'src/shared/interfaces/brand.interface';
import { IContact } from 'src/shared/interfaces/contact.interface';
import { ISchedule } from 'src/shared/interfaces/schedule.interface';
import { IShipping } from 'src/shared/interfaces/shipping.interface';
import { ConfigsService } from './configs.service';
export declare class ConfigsController {
    private configsService;
    constructor(configsService: ConfigsService);
    createConfigs(): Promise<any>;
    getConfigs(): Promise<any>;
    updateName(id: string, name: string): Promise<any>;
    updateCategories(id: string, categories: string[]): Promise<any>;
    updateBrands(id: string, brands: IBrand[]): Promise<any>;
    updateShipping(id: string, shipping: IShipping[]): Promise<any>;
    updateContact(id: string, contact: IContact): Promise<any>;
    updateSchedule(id: string, schedule: ISchedule): Promise<any>;
}
