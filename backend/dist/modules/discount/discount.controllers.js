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
exports.DiscountController = void 0;
const common_1 = require("@nestjs/common");
const discount_service_1 = require("./discount.service");
let DiscountController = class DiscountController {
    constructor(discountService) {
        this.discountService = discountService;
    }
    async createDiscount(discount) {
        return this.discountService.createDiscount(discount);
    }
    async getDiscountByProduct(product) {
        return this.getDiscountByProduct(product);
    }
    async getDiscountByProductAuthUSer(product) {
        const forUser = '60142c44c463fe314b645bbc';
        return this.discountService.getDiscountByProductAuthUSer(product, forUser);
    }
    async updateDiscount(discount) {
        return this.updateDiscount(discount);
    }
};
__decorate([
    common_1.Post(),
    __param(0, common_1.Body('discount')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], DiscountController.prototype, "createDiscount", null);
__decorate([
    common_1.Get('by-product/:product'),
    __param(0, common_1.Param('product')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], DiscountController.prototype, "getDiscountByProduct", null);
__decorate([
    common_1.Get('by-product/:product/by-product/auth/:product'),
    __param(0, common_1.Param('product')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], DiscountController.prototype, "getDiscountByProductAuthUSer", null);
__decorate([
    common_1.Put(),
    __param(0, common_1.Body('discount')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], DiscountController.prototype, "updateDiscount", null);
DiscountController = __decorate([
    common_1.Controller('discount'),
    __metadata("design:paramtypes", [discount_service_1.DiscountService])
], DiscountController);
exports.DiscountController = DiscountController;
//# sourceMappingURL=discount.controllers.js.map