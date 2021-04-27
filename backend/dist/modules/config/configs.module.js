"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConfigsModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const check_admin_1 = require("../../shared/middlewares/check-admin");
const configs_controllers_1 = require("./configs.controllers");
const configs_model_1 = require("./configs.model");
const configs_service_1 = require("./configs.service");
let ConfigsModule = class ConfigsModule {
    configure(consumer) {
        consumer.apply(check_admin_1.CheckAdmin).forRoutes(configs_controllers_1.ConfigsController);
    }
};
ConfigsModule = __decorate([
    common_1.Module({
        imports: [
            mongoose_1.MongooseModule.forFeature([{ name: 'configs', schema: configs_model_1.ConfigsSchema }]),
        ],
        controllers: [configs_controllers_1.ConfigsController],
        providers: [configs_service_1.ConfigsService],
    })
], ConfigsModule);
exports.ConfigsModule = ConfigsModule;
//# sourceMappingURL=configs.module.js.map