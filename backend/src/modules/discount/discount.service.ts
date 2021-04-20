import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IDiscount } from './discount.model';

@Injectable()
export class DiscountService {
  constructor(@InjectModel('Discount') private discountModel: Model<any>) {}

  async createDiscount(discount: IDiscount) {
    const newDiscount = new this.discountModel(discount);
    return newDiscount.save();
  }

  async getDiscounts() {
    return this.discountModel.find({ forUser: { $exists: false } }).exec(); //TODO check the expiration date!
  }

  async getDiscountByProduct(productId: string) {
    return this.discountModel.findOne({ productId }).exec(); //TODO check the expiration date!
  }

  async getDiscountByProductAuthUSer(productId: string, forUser: string) {
    return this.discountModel
      .findOne({ $or: [{ productId }, { forUser }] })
      .exec(); //TODO check the expiration date!
  }

  async updateDiscount(discount: IDiscount) {
    const {_id, cut, expirationDate, productId, forUser} = discount;
    return this.discountModel.findByIdAndUpdate({_id},{cut, expirationDate, productId, forUser}).exec();
  }
}
