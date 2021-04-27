import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { IDiscount } from './discount.model';
import { DiscountService } from './discount.service';

@Controller('discount')
export class DiscountController {
  constructor(private discountService: DiscountService) {}

  @Post()
  async createDiscount(@Body('discount') discount: IDiscount) {
    return this.discountService.createDiscount(discount);
  }

  @Get()
  async getDiscounts() {
    return this.discountService.getDiscounts();
  }

  @Get('by-product/:product')
  async getDiscountByProduct(@Param('product') product: string) {
    return this.getDiscountByProduct(product);
  }

  @Get('by-product/:product/by-product/auth/:product')
  async getDiscountByProductAuthUSer(@Param('product') product: string) {
    const forUser = '60142c44c463fe314b645bbc'; //! Replace this with user's id!
    return this.discountService.getDiscountByProductAuthUSer(product, forUser);
  }

  @Put()
  async updateDiscount(@Body('discount') discount: IDiscount) {
    return this.updateDiscount(discount);
  }
}
