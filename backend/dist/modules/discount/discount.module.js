"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DiscountModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const discount_controllers_1 = require("./discount.controllers");
const discount_model_1 = require("./discount.model");
const discount_service_1 = require("./discount.service");
common_1.Module({
    imports: [
        mongoose_1.MongooseModule.forFeature([{ name: 'Discount', schema: discount_model_1.DiscountSchema }]),
    ],
    controllers: [discount_controllers_1.DiscountController],
    providers: [discount_service_1.DiscountService],
});
class DiscountModule {
}
exports.DiscountModule = DiscountModule;
//# sourceMappingURL=discount.module.js.map