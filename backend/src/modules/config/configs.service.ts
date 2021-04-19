import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IBrand } from 'src/shared/interfaces/brand.interface';
import { IContact } from 'src/shared/interfaces/contact.interface';
import { ISchedule } from 'src/shared/interfaces/schedule.interface';

import { IShipping } from 'src/shared/interfaces/shipping.interface';
import { IConfigs } from './configs.model';

@Injectable()
export class ConfigsService {
  configs: IConfigs[] = [];

  constructor(@InjectModel('Configs') private configsModel: Model<any>) {}

  async createCongigs(data: IConfigs) {
    const {
      name,
      categories,
      brands,
      shipping,
      program,
      contact,
      aboutUs,
      termsOfUse,
    } = data;
    const configs = {
      name,
      categories,
      brands,
      shipping,
      program,
      contact,
      aboutUs,
      termsOfUse,
    };
    const newConfigs = new this.configsModel(configs);
    const result = await newConfigs.save();
    return result;
  }

  async getConfigs() {
    const result = await this.configsModel.find().exec();
    return result;
  }

  async updateName(_id: string, name: string) {
    const result = await this.configsModel
      .findByIdAndUpdate({ _id }, { name })
      .exec();
    return result;
  }

  async updateCategories(_id: string, categories: string[]) {
    const result = await this.configsModel
      .findByIdAndUpdate({ _id }, { categories })
      .exec();
    return result;
  }

  async updateBrands(_id: string, brands: IBrand[]) {
    const result = await this.configsModel
      .findByIdAndUpdate({ _id }, { brands })
      .exec();
    return result;
  }

  async updateShipping(_id: string, shipping: IShipping[]) {
    const result = await this.configsModel
      .findByIdAndUpdate({ _id }, { shipping })
      .exec();
    return result;
  }

  async updateContact(_id: string, contact: IContact) {
    const result = await this.configsModel
      .findByIdAndUpdate({ _id }, { contact })
      .exec();
    return result;
  }

  async updateSchedule(_id: string, schedule: ISchedule) {
    const result = await this.configsModel
      .findByIdAndUpdate({ _id }, { schedule })
      .exec();
    return result;
  }
}
