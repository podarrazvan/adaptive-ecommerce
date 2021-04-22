import { Body, Controller, Get, Post, Put } from '@nestjs/common';
import { StatisticsService } from './statistics.service';

@Controller('statistics')
export class StatisticsController {
  constructor(private statiticsService: StatisticsService) {}

  @Post()
  async createStatistics() {
    return this.statiticsService.createStatistics();
  }

  @Put()
  async addSearch(@Body('search') search: string) {
    return this.statiticsService.addSearch(search);
  }

  @Get()
  async getAllStatistics() {
    return this.statiticsService.getAllStatistics();
  }

  @Get('/most-searched')
  async getMostSearched() {
    return this.statiticsService.getMostSearched();
  }
}
