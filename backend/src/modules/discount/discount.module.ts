import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DiscountController } from './discount.controllers';
import { DiscountSchema } from './discount.model';
import { DiscountService } from './discount.service';

Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Discount', schema: DiscountSchema }]),
  ],
  controllers: [DiscountController],
  providers: [DiscountService],
});

export class DiscountModule {}
