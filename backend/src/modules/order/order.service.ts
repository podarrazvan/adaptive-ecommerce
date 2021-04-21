import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IOrder } from './order.model';

@Injectable()
export class OrderService {
  constructor(@InjectModel('Order') private orderModel: Model<any>) {}

  async createOrder(order) {
    const { name, email, adress, city, state, zipCode } = order.billingDetails;
    const { shipping, payment, total, status, date } = order.orderDetails;
    const { orderNotes, products } = order;
    const d = new Date().getTime();
    const orderNumber = Math.round(d / 1000 - 1615160000);
    const orderData = {
      name,
      email,
      adress,
      city,
      state,
      zipCode,
      shipping,
      payment,
      total,
      status,
      date,
      orderNotes,
      products,
      orderNumber,
    };
    const newOrder = new this.orderModel(orderData);
    return newOrder.save();
  }

  async updateStatus(_id: string, status: string) {
    return this.orderModel.findOneAndUpdate({ _id }, { status }).exec();
  }

  async getOrders() {
    return this.orderModel.find().exec();
  }

  async getOrder(orderNumber: string) {
    return this.orderModel.findOne({ orderNumber }).exec();
  }

  async deleteOrder(_id) {
    return this.orderModel.deleteOne({ _id }).exec();
  }
}
