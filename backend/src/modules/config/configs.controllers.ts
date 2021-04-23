import { Body, Controller, Get, Post, Put, Param } from '@nestjs/common';
import { IBrand } from 'src/shared/interfaces/brand.interface';
import { IContact } from 'src/shared/interfaces/contact.interface';
import { ISchedule } from 'src/shared/interfaces/schedule.interface';
import { IShipping } from 'src/shared/interfaces/shipping.interface';
import { ConfigsService } from './configs.service';

@Controller('website')
export class ConfigsController {
  constructor(private configsService: ConfigsService) {}

  @Post()
  async createConfigs() {
    const configs = this.configsService.createCongigs();
    return configs;
  }

  @Get()
  async getConfigs() {
    return this.configsService.getConfigs();
  }

  @Put(':id/websiteName')
  async updateName(@Param('id') id: string, @Body('name') name: string) {
    return this.configsService.updateName(id, name);
  }

  @Put(':id/websiteCategories')
  async updateCategories(
    @Param('id') id: string,
    @Body('categories') categories: string[],
  ) {
    return this.configsService.updateCategories(id, categories);
  }

  @Put(':id/websiteBrands')
  async updateBrands(
    @Param('id') id: string,
    @Body('brands') brands: IBrand[],
  ) {
    return this.configsService.updateBrands(id, brands);
  }

  @Put(':id/websiteShipping')
  async updateShipping(
    @Param('id') id: string,
    @Body('shipping') shipping: IShipping[],
  ) {
    return this.configsService.updateShipping(id, shipping);
  }

  @Put(':id/websiteContact')
  async updateContact(
    @Param('id') id: string,
    @Body('contact') contact: IContact,
  ) {
    return this.configsService.updateContact(id, contact);
  }

  @Put(':id/websiteSchedule')
  async updateSchedule(
    @Param('id') id: string,
    @Body('schedule') schedule: ISchedule,
  ) {
    return this.configsService.updateSchedule(id, schedule);
  }
}
