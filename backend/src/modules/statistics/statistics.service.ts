import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose'; 

@Injectable()
export class StatisticsService {
  constructor(@InjectModel('Statistics') private statisticsModel: Model<any>) {}

  async createStatistics() {
    const statistics = {
      search: [],
    };
    const newStatistics = new this.statisticsModel(statistics);
    return newStatistics.save();
  }

  async addSearch(search: string) {
    //TODO
  }

  async getMostSearched() {
    //TODO
  }

  async getAllStatistics() {
    return this.statisticsModel.find().exec();
  }
}
