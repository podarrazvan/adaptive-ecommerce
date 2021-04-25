"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CouponModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const coupon_controllers_1 = require("./coupon.controllers");
const coupon_model_1 = require("./coupon.model");
const coupon_service_1 = require("./coupon.service");
common_1.Module({
    imports: [
        mongoose_1.MongooseModule.forFeature([{ name: 'Coupon', schema: coupon_model_1.CouponSchema }]),
    ],
    controllers: [coupon_controllers_1.CouponController],
    providers: [coupon_service_1.CouponService],
});
class CouponModule {
}
exports.CouponModule = CouponModule;
//# sourceMappingURL=coupon.module.js.map