"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StatisticsModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const statistics_controllers_1 = require("./statistics.controllers");
const statistics_model_1 = require("./statistics.model");
const statistics_service_1 = require("./statistics.service");
common_1.Module({
    imports: [
        mongoose_1.MongooseModule.forFeature([
            { name: 'Statistics', schema: statistics_model_1.StatisticsSchema }
        ]),
    ],
    controllers: [statistics_controllers_1.StatisticsController],
    providers: [statistics_service_1.StatisticsService],
});
class StatisticsModule {
}
exports.StatisticsModule = StatisticsModule;
//# sourceMappingURL=statistics.module.js.map