"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const mongoose_1 = require("@nestjs/mongoose");
const configs_module_1 = require("./modules/config/configs.module");
const contact_module_1 = require("./modules/contact/contact.module");
const coupon_model_1 = require("./modules/coupon/coupon.model");
const coupon_controllers_1 = require("./modules/coupon/coupon.controllers");
const coupon_service_1 = require("./modules/coupon/coupon.service");
const product_controllers_1 = require("./modules/product/product.controllers");
const product_model_1 = require("./modules/product/product.model");
const product_service_1 = require("./modules/product/product.service");
const discount_model_1 = require("./modules/discount/discount.model");
const discount_controllers_1 = require("./modules/discount/discount.controllers");
const discount_service_1 = require("./modules/discount/discount.service");
const order_model_1 = require("./modules/order/order.model");
const order_service_1 = require("./modules/order/order.service");
const order_controllers_1 = require("./modules/order/order.controllers");
const statistics_service_1 = require("./modules/statistics/statistics.service");
const statistics_controllers_1 = require("./modules/statistics/statistics.controllers");
const statistics_model_1 = require("./modules/statistics/statistics.model");
const user_module_1 = require("./modules/user/user.module");
const upload_images_module_1 = require("./shared/modules/images/upload-images.module");
let AppModule = class AppModule {
};
AppModule = __decorate([
    common_1.Module({
        imports: [
            configs_module_1.ConfigsModule,
            contact_module_1.ContactModule,
            user_module_1.UsersModule,
            upload_images_module_1.UploadImageModule,
            mongoose_1.MongooseModule.forRoot('mongodb+srv://admin:admin@backend-test.6tqwn.mongodb.net/ecommerce'),
            mongoose_1.MongooseModule.forFeature([
                { name: 'Coupon', schema: coupon_model_1.CouponSchema },
                { name: 'Product', schema: product_model_1.ProductSchema },
                { name: 'Discount', schema: discount_model_1.DiscountSchema },
                { name: 'Order', schema: order_model_1.OrderSchema },
                { name: 'Product', schema: product_model_1.ProductSchema },
                { name: 'Statistics', schema: statistics_model_1.StatisticsSchema },
            ]),
        ],
        controllers: [
            app_controller_1.AppController,
            coupon_controllers_1.CouponController,
            product_controllers_1.ProductController,
            discount_controllers_1.DiscountController,
            order_controllers_1.OrderController,
            product_controllers_1.ProductController,
            statistics_controllers_1.StatisticsController,
        ],
        providers: [
            app_service_1.AppService,
            coupon_service_1.CouponService,
            product_service_1.ProductService,
            discount_service_1.DiscountService,
            order_service_1.OrderService,
            product_service_1.ProductService,
            statistics_service_1.StatisticsService,
        ],
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map