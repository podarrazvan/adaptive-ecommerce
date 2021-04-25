"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConfigsService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const brand_interface_1 = require("../../shared/interfaces/brand.interface");
const contact_interface_1 = require("../../shared/interfaces/contact.interface");
const schedule_interface_1 = require("../../shared/interfaces/schedule.interface");
const shipping_interface_1 = require("../../shared/interfaces/shipping.interface");
let ConfigsService = class ConfigsService {
    constructor(configsModel) {
        this.configsModel = configsModel;
        this.configs = [];
    }
    async createCongigs(data) {
        const { name, categories, brands, shipping, program, contact, aboutUs, termsOfUse, } = data;
        const configs = {
            name,
            categories,
            brands,
            shipping,
            program,
            contact,
            aboutUs,
            termsOfUse,
        };
        const newConfigs = new this.configsModel(configs);
        const result = await newConfigs.save();
        return result;
    }
    async getConfigs() {
        const result = await this.configsModel.find().exec();
        return result;
    }
    async updateName(_id, name) {
        const result = await this.configsModel
            .findByIdAndUpdate({ _id }, { name })
            .exec();
        return result;
    }
    async updateCategories(_id, categories) {
        const result = await this.configsModel
            .findByIdAndUpdate({ _id }, { categories })
            .exec();
        return result;
    }
    async updateBrands(_id, brands) {
        const result = await this.configsModel
            .findByIdAndUpdate({ _id }, { brands })
            .exec();
        return result;
    }
    async updateShipping(_id, shipping) {
        const result = await this.configsModel
            .findByIdAndUpdate({ _id }, { shipping })
            .exec();
        return result;
    }
    async updateContact(_id, contact) {
        const result = await this.configsModel
            .findByIdAndUpdate({ _id }, { contact })
            .exec();
        return result;
    }
    async updateSchedule(_id, schedule) {
        const result = await this.configsModel
            .findByIdAndUpdate({ _id }, { schedule })
            .exec();
        return result;
    }
};
ConfigsService = __decorate([
    common_1.Injectable(),
    __param(0, mongoose_1.InjectModel('configs')),
    __metadata("design:paramtypes", [mongoose_2.Model])
], ConfigsService);
exports.ConfigsService = ConfigsService;
//# sourceMappingURL=configs.service.js.map