import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { OrderController } from './order.controllers';
import { OrderSchema } from './order.model';
import { OrderService } from './order.service';

Module({
    imports: [
      MongooseModule.forFeature([{ name: 'Order', schema: OrderSchema }]),
    ],
    controllers: [OrderController],
    providers: [OrderService],
  });