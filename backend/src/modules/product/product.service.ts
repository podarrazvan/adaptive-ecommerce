import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IProduct } from './product.model';

@Injectable()
export class ProductService {
  constructor(@InjectModel('Product') private productModel: Model<any>) {}

  async createProduct(product: IProduct) {
    const newProduct = new this.productModel({
      ...product,
      sold: 0,
      rating: {
        oneStar: 0,
        twoStars: 0,
        threeStars: 0,
        forStars: 0,
        fiveStars: 0,
        average: 0,
      },
    });
    return newProduct.save().exec();
  }

  async updateProduct(product: IProduct) {
    const _id = product._id;
    return this.productModel.findByIdAndUpdate({ _id }, product).exec();
  }

  async updateSold(status: string, products: IProduct[]) {
    //TODO
  }

  async getProductsByCategory(category: string) {
    return this.productModel.find({ category }).exec();
  }

  async getProductById(_id: string) {
    return this.productModel.findById({ _id }).exec();
  }

  async getPaginatedProductsByCategory(
    category: string,
    page: number,
    limit: number,
  ) {
    //TODO
  }

  async getPaginatedProductsByBrand(
    brand: string,
    page: number,
    limit: number,
  ) {
    //TODO
  }
  async getPaginatedProducts() {
    //TODO
  }

  async getLastProductsByCategory(category: string, limit: number) {
    return this.productModel
      .find({ category })
      .sort({ _id: -1 })
      .limit(limit)
      .exec();
  }

  //! Should be displayed according to the user's preferences
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

  async getYouMayLike(size: number) {
    return this.productModel.aggregate([{ $sample: { size } }]).exec();
  }

  async getFeaturedProducts(size: number) {
    return this.productModel.aggregate([{ $sample: { size } }]).exec(); //! same as getYouMayLike
  }

  async getSpecialForYou(forUser: string) {
    //TODO
  }
  //!

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

  //! Should be selected according to the rating
  //! after rating is implemented. See Trello [products] Top Rated Products

  async getTopRated() {
    const size = 3;
    return this.productModel.aggregate([{ $sample: { size } }]).exec(); //! same as getYouMayLike
  }

  async getAllProducts() {
    return this.productModel.find().exec();
  }

  async deleteProduct(_id: string) {
    return this.productModel.findByIdAndDelete({ _id }).exec();
  }
}
