import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { IProduct } from './product.model';
import { ProductService } from './product.service';

@Controller('products')
export class ProductController {
  constructor(private productService: ProductService) {}

  @Post() //TODO check admin!
  async createProduct(@Body('product') product: IProduct) {
    return this.productService.createProduct(product);
  }

  @Put() //TODO check admin!
  async updateProduct(@Body('product') product: IProduct) {
    return this.productService.updateProduct(product);
  }

  @Put('sold/:status')
  async updateSold(
    @Param('status') status: string,
    @Body('products') products: IProduct[],
  ) {
    return this.productService.updateSold(status, products);
  }

  @Get()
  async getAllProducts() {
    return this.productService.getAllProducts();
  }

  @Get('category/:category')
  async getProductsByCategory(@Param('category') category: string) {
    return this.productService.getProductsByCategory(category);
  }

  @Get('id/:id')
  async getProductsById(@Param('id') id: string) {
    return this.productService.getProductById(id);
  }
  @Get('paginated/category')
  async getPaginatedProductsByCategory(
    @Query('name') name: string,
    @Query('page') page: string,
    @Query('limit') limit: string,
  ) {
    return this.productService.getPaginatedProductsByCategory(
      name,
      +page,
      +limit,
    );
  }
  @Get('paginated')
  async getPaginatedProducts() {
    return this.productService.getPaginatedProducts();
  }
  @Get('last')
  async getLastProductsByCategory(
    @Query('category') category: string,
    @Query('limit') limit: string,
  ) {
    return this.productService.getLastProductsByCategory(category, +limit);
  }
  @Get('main-products')
  async getMainProducts(@Query('size') size: string) {
    return this.productService.getMainProducts(+size);
  }
  @Get('you-may-like')
  async getYouMayLike(@Query('size') size: string) {
    return this.productService.getYouMayLike(+size);
  }
  @Get('featured-products')
  async getFeaturedProducts(@Query('size') size: string) {
    return this.productService.getFeaturedProducts(+size);
  }
  @Get('special-for-you') //TODO check auth!
  async getSpecialForYou(@Body('userId') userId: string) {
    return this.productService.getSpecialForYou(userId);
  }
  @Get('best-sellers')
  async getBestSellers() {
    return this.productService.getBestSellers();
  }
  @Get('top-rated')
  async getTopRated() {
    return this.productService.getTopRated();
  }

  @Delete(':id') //TODO check admin!
  async deleteProduct(@Param('id') id: string) {
    return this.productService.deleteProduct(id);
  }
}
