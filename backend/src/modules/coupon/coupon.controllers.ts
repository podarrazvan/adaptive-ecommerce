import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ICoupon } from './coupon.model';
import { CouponService } from './coupon.service';

@Controller('coupon')
export class CouponController {
  constructor(private couponService: CouponService) {}

  @Post()// TODO check admin!
  async createCoupon(@Body('data') data: ICoupon) {
    return this.couponService.createCoupon(data);
  }

  @Get()
  async getCoupons() {// TODO check admin!
    return this.couponService.getCoupons();
  }

  @Get(':code')
  async getCoupon(@Param('code') code: string) {
    return this.couponService.getCoupon(code);
  }

  @Put() //TODO check admin!
  async updateCoupon(@Body('data') data: ICoupon) {
    return this.couponService.updateCoupon(data);
  }

  @Delete(':id')//TODO check admin!
  async deleteCoupon(@Param('id') id: string) {
    return this.couponService.deleteCoupon(id);
  }
}
