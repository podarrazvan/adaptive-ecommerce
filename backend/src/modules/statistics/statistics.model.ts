import * as mongoose from 'mongoose';

export const StatisticsSchema = new mongoose.Schema({
  search: [
    {
      searchedElement: { type: String },
      total: { type: Number },
      currentDay: { type: Number },
    },
  ],
});

export interface IStatistics {

}
