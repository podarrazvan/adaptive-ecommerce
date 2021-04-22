import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CouponController } from './coupon.controllers';
import { CouponSchema } from './coupon.model';
import { CouponService } from './coupon.service';

Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Coupon', schema: CouponSchema }]),
  ],
  controllers: [CouponController],
  providers: [CouponService],
});
export class CouponModule {}
