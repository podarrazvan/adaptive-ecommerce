import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { StatisticsController } from './statistics.controllers';
import { StatisticsSchema } from './statistics.model';
import { StatisticsService } from './statistics.service';

Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Statistics', schema: StatisticsSchema }
    ]),
  ],
  controllers: [StatisticsController],
  providers: [StatisticsService],
});
export class StatisticsModule {}
