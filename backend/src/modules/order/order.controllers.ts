import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { IOrder } from './order.model';
import { OrderService } from './order.service';

@Controller('order')
export class OrderController {
  constructor(private orderService: OrderService) {}

  @Post() //TODO check admin!
  async createOrder(@Body('order') order: IOrder) {
    return this.orderService.createOrder(order);
  }

  @Put('/update/:id/:status') //TODO check admin!
  async updateStatus(@Param('id') id: string, @Param('status') status: string) {
    return this.updateStatus(id, status);
  }

  @Get('') //TODO check admin!
  async getOrders() {
    return this.orderService.getOrders();
  }

  @Get('/:orderNumber')
  async getOrder(@Param('oderNumber') orderNumber: string) {
    return this.orderService.getOrder(orderNumber);
  }

  @Delete('/:id') //TODO check admin!
  async deleteOrder(@Param('id') id: string) {
    return this.orderService.deleteOrder(id);
  }
}
