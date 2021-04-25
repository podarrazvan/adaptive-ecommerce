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
exports.ProductController = void 0;
const common_1 = require("@nestjs/common");
const product_service_1 = require("./product.service");
let ProductController = class ProductController {
    constructor(productService) {
        this.productService = productService;
    }
    async createProduct(product) {
        return this.productService.createProduct(product);
    }
    async updateProduct(product) {
        return this.productService.updateProduct(product);
    }
    async updateSold(status, products) {
        return this.productService.updateSold(status, products);
    }
    async getAllProducts() {
        return this.productService.getAllProducts();
    }
    async getProductsByCategory(category) {
        return this.productService.getProductsByCategory(category);
    }
    async getProductsById(id) {
        return this.productService.getProductById(id);
    }
    async getPaginatedProductsByCategory(name, page, limit) {
        return this.productService.getPaginatedProductsByCategory(name, +page, +limit);
    }
    async getPaginatedProducts() {
        return this.productService.getPaginatedProducts();
    }
    async getLastProductsByCategory(category, limit) {
        return this.productService.getLastProductsByCategory(category, +limit);
    }
    async getMainProducts(size) {
        return this.productService.getMainProducts(+size);
    }
    async getYouMayLike(size) {
        return this.productService.getYouMayLike(+size);
    }
    async getFeaturedProducts(size) {
        return this.productService.getFeaturedProducts(+size);
    }
    async getSpecialForYou(userId) {
        return this.productService.getSpecialForYou(userId);
    }
    async getBestSellers() {
        return this.productService.getBestSellers();
    }
    async getTopRated() {
        return this.productService.getTopRated();
    }
    async deleteProduct(id) {
        return this.productService.deleteProduct(id);
    }
};
__decorate([
    common_1.Post(),
    __param(0, common_1.Body('product')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "createProduct", null);
__decorate([
    common_1.Put(),
    __param(0, common_1.Body('product')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "updateProduct", null);
__decorate([
    common_1.Put('sold/:status'),
    __param(0, common_1.Param('status')),
    __param(1, common_1.Body('products')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Array]),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "updateSold", null);
__decorate([
    common_1.Get(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "getAllProducts", null);
__decorate([
    common_1.Get('category/:category'),
    __param(0, common_1.Param('category')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "getProductsByCategory", null);
__decorate([
    common_1.Get('id/:id'),
    __param(0, common_1.Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "getProductsById", null);
__decorate([
    common_1.Get('paginated/category'),
    __param(0, common_1.Query('name')),
    __param(1, common_1.Query('page')),
    __param(2, common_1.Query('limit')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String]),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "getPaginatedProductsByCategory", null);
__decorate([
    common_1.Get('paginated'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "getPaginatedProducts", null);
__decorate([
    common_1.Get('last'),
    __param(0, common_1.Query('category')),
    __param(1, common_1.Query('limit')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "getLastProductsByCategory", null);
__decorate([
    common_1.Get('main-products'),
    __param(0, common_1.Query('size')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "getMainProducts", null);
__decorate([
    common_1.Get('you-may-like'),
    __param(0, common_1.Query('size')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "getYouMayLike", null);
__decorate([
    common_1.Get('featured-products'),
    __param(0, common_1.Query('size')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "getFeaturedProducts", null);
__decorate([
    common_1.Get('special-for-you'),
    __param(0, common_1.Body('userId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "getSpecialForYou", null);
__decorate([
    common_1.Get('best-sellers'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "getBestSellers", null);
__decorate([
    common_1.Get('top-rated'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "getTopRated", null);
__decorate([
    common_1.Delete(':id'),
    __param(0, common_1.Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "deleteProduct", null);
ProductController = __decorate([
    common_1.Controller('products'),
    __metadata("design:paramtypes", [product_service_1.ProductService])
], ProductController);
exports.ProductController = ProductController;
//# sourceMappingURL=product.controllers.js.map