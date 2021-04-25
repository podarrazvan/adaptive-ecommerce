import { StatisticsService } from './statistics.service';
export declare class StatisticsController {
    private statiticsService;
    constructor(statiticsService: StatisticsService);
    createStatistics(): Promise<any>;
    addSearch(search: string): Promise<void>;
    getAllStatistics(): Promise<any[]>;
    getMostSearched(): Promise<void>;
}
