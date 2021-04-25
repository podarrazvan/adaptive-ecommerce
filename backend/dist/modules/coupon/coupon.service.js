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
exports.CouponService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const coupon_model_1 = require("./coupon.model");
let CouponService = class CouponService {
    constructor(couponModel) {
        this.couponModel = couponModel;
    }
    async createCoupon(data) {
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
    async getCoupon(code) {
        const result = await this.couponModel.findOne({ code }).exec();
        return result;
    }
    async updateCoupon(coupon) {
        const { _id, code, discount } = coupon;
        const result = this.couponModel
            .findByIdAndUpdate({ _id }, { code, discount })
            .exec();
        return result;
    }
    async deleteCoupon(_id) {
        const result = this.couponModel.findByIdAndDelete({ _id });
        return result;
    }
};
CouponService = __decorate([
    common_1.Injectable(),
    __param(0, mongoose_1.InjectModel('Coupon')),
    __metadata("design:paramtypes", [mongoose_2.Model])
], CouponService);
exports.CouponService = CouponService;
//# sourceMappingURL=coupon.service.js.map