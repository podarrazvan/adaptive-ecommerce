import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ICoupon } from 'src/modules/coupon/coupon.model';

@Injectable()
export class CouponService {
  constructor(@InjectModel('Coupon') private couponModel: Model<any>) {}

  async createCoupon(data: ICoupon) {
    const { code, discount } = data;
    const coupon = { code, discount };
    const newCoupon = new this.couponModel(coupon);
    const result = await newCoupon.save();
    return result;
  }

  async getCoupons() {
    const result = await this.couponModel.find().exec();
    return result;
  }

  async getCoupon(code: string) {
    const result = await this.couponModel.findOne({ code }).exec();
    return result;
  }

  async updateCoupon(coupon: ICoupon) {
    const { _id, code, discount } = coupon;
    const result = this.couponModel
      .findByIdAndUpdate({ _id }, { code, discount })
      .exec();
    return result;
  }

  async deleteCoupon(_id: string) {
    const result = this.couponModel.findByIdAndDelete({ _id });
    return result;
  }
}
