"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const product_controllers_1 = require("./product.controllers");
const product_model_1 = require("./product.model");
const product_service_1 = require("./product.service");
common_1.Module({
    imports: [
        mongoose_1.MongooseModule.forFeature([{ name: 'Product', schema: product_model_1.ProductSchema }]),
    ],
    controllers: [product_controllers_1.ProductController],
    providers: [product_service_1.ProductService],
});
class ProductModule {
}
exports.ProductModule = ProductModule;
//# sourceMappingURL=product.module.js.map