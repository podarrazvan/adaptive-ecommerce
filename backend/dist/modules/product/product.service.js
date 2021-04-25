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
exports.ProductService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
let ProductService = class ProductService {
    constructor(productModel) {
        this.productModel = productModel;
    }
    async createProduct(product) {
        const newProduct = new this.productModel(Object.assign(Object.assign({}, product), { sold: 0, rating: {
                oneStar: 0,
                twoStars: 0,
                threeStars: 0,
                forStars: 0,
                fiveStars: 0,
                average: 0,
            } }));
        return newProduct.save().exec();
    }
    async updateProduct(product) {
        const _id = product._id;
        return this.productModel.findByIdAndUpdate({ _id }, product).exec();
    }
    async updateSold(status, products) {
    }
    async getProductsByCategory(category) {
        return this.productModel.find({ category }).exec();
    }
    async getProductById(_id) {
        return this.productModel.findById({ _id }).exec();
    }
    async getPaginatedProductsByCategory(category, page, limit) {
    }
    async getPaginatedProductsByBrand(brand, page, limit) {
    }
    async getPaginatedProducts() {
    }
    async getLastProductsByCategory(category, limit) {
        return this.productModel
            .find({ category })
            .sort({ _id: -1 })
            .limit(limit)
            .exec();
    }
    async getMainProducts(size) {
        const products = await this.productModel
            .aggregate([{ $sample: { size } }])
            .exec();
        const responseProducts = {
            products: products.splice(0, 2),
            mainAd: products[0],
            mainProduct: products[1],
        };
        return responseProducts;
    }
    async getYouMayLike(size) {
        return this.productModel.aggregate([{ $sample: { size } }]).exec();
    }
    async getFeaturedProducts(size) {
        return this.productModel.aggregate([{ $sample: { size } }]).exec();
    }
    async getSpecialForYou(forUser) {
    }
    async getBestSellers() {
        const extraProducts = 3;
        const limit = 7 + extraProducts;
        const products = await this.productModel
            .find()
            .find()
            .sort({ sold: -1 })
            .limit(limit);
        const returnProducts = {
            main: products[0],
            middle: products.slice(1, 4),
            bottom: products.slice(4, 7),
            extra: products.slice(7, limit),
        };
        return returnProducts;
    }
    async getTopRated() {
        const size = 3;
        return this.productModel.aggregate([{ $sample: { size } }]).exec();
    }
    async getAllProducts() {
        return this.productModel.find().exec();
    }
    async deleteProduct(_id) {
        return this.productModel.findByIdAndDelete({ _id }).exec();
    }
};
ProductService = __decorate([
    common_1.Injectable(),
    __param(0, mongoose_1.InjectModel('Product')),
    __metadata("design:paramtypes", [mongoose_2.Model])
], ProductService);
exports.ProductService = ProductService;
//# sourceMappingURL=product.service.js.map