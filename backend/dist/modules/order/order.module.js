"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const order_controllers_1 = require("./order.controllers");
const order_model_1 = require("./order.model");
const order_service_1 = require("./order.service");
common_1.Module({
    imports: [
        mongoose_1.MongooseModule.forFeature([{ name: 'Order', schema: order_model_1.OrderSchema }]),
    ],
    controllers: [order_controllers_1.OrderController],
    providers: [order_service_1.OrderService],
});
class OrderModule {
}
exports.OrderModule = OrderModule;
//# sourceMappingURL=order.module.js.map