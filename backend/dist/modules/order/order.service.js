"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
let OrderService = class OrderService {
    constructor(orderModel) {
        this.orderModel = orderModel;
    }
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
    async updateStatus(_id, status) {
        return this.orderModel.findOneAndUpdate({ _id }, { status }).exec();
    }
    async getOrders() {
        return this.orderModel.find().exec();
    }
    async getOrder(orderNumber) {
        return this.orderModel.findOne({ orderNumber }).exec();
    }
    async deleteOrder(_id) {
        return this.orderModel.deleteOne({ _id }).exec();
    }
};
OrderService = __decorate([
    common_1.Injectable(),
    __param(0, mongoose_1.InjectModel('Order')),
    __metadata("design:paramtypes", [mongoose_2.Model])
], OrderService);
exports.OrderService = OrderService;
//# sourceMappingURL=order.service.js.map