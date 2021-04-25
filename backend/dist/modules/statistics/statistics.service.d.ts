import { Model } from 'mongoose';
export declare class StatisticsService {
    private statisticsModel;
    constructor(statisticsModel: Model<any>);
    createStatistics(): Promise<any>;
    addSearch(search: string): Promise<void>;
    getMostSearched(): Promise<void>;
    getAllStatistics(): Promise<any[]>;
}
