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

@Controller('product')
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

  @Put('/sold/:status')
  async updateSold(
    @Param('status') status: string,
    @Body('products') products: IProduct[],
  ) {
    return this.productService.updateSold(status, products);
  }

  @Get('/category/:category')
  async getProductsByCategory(@Param('category') category: string) {
    return this.productService.getProductsByCategory(category);
  }

  @Get('/id/:id')
  async getProductsById(@Param('id') id: string) {
    return this.productService.getProductById(id);
  }
  @Get('/paginated/category')
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
  @Get()
  async getPaginatedProducts() {
    return this.productService.getPaginatedProducts();
  }
  @Get()
  async getLastProductsByCategory(
    @Query('category') category: string,
    @Query('limit') limit: string,
  ) {
    return this.productService.getLastProductsByCategory(category, +limit);
  }
  @Get()
  async getMainProducts() {
    return this.productService.getMainProducts();
  }
  @Get()
  async getYouMayLike(@Query('size') size: string) {
    return this.productService.getYouMayLike(+size);
  }
  @Get()
  async getFeaturedProducts(@Query('size') size: string) {
    return this.productService.getFeaturedProducts(+size);
  }
  @Get() //TODO check auth!
  async getSpecialForYou(@Body('userId') userId: string) {
    return this.productService.getSpecialForYou(userId);
  }
  @Get()
  async getBestSellers() {
    return this.productService.getBestSellers();
  }
  @Get()
  async getTopRated() {
    return this.productService.getTopRated();
  }
  @Get()
  async getAllProducts() {
    return this.productService.getAllProducts();
  }
  @Delete('/:id') //TODO check admin!
  async deleteProduct(@Param('id') id: string) {
    return this.productService.deleteProduct(id);
  }
}
