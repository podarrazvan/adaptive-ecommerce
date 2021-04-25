import { Model } from 'mongoose';
import { IBrand } from 'src/shared/interfaces/brand.interface';
import { IContact } from 'src/shared/interfaces/contact.interface';
import { ISchedule } from 'src/shared/interfaces/schedule.interface';
import { IShipping } from 'src/shared/interfaces/shipping.interface';
import { IConfigs } from './configs.model';
export declare class ConfigsService {
    private configsModel;
    configs: IConfigs[];
    constructor(configsModel: Model<any>);
    createCongigs(data: IConfigs): Promise<any>;
    getConfigs(): Promise<any[]>;
    updateName(_id: string, name: string): Promise<any>;
    updateCategories(_id: string, categories: string[]): Promise<any>;
    updateBrands(_id: string, brands: IBrand[]): Promise<any>;
    updateShipping(_id: string, shipping: IShipping[]): Promise<any>;
    updateContact(_id: string, contact: IContact): Promise<any>;
    updateSchedule(_id: string, schedule: ISchedule): Promise<any>;
}
