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
exports.ConfigsController = void 0;
const common_1 = require("@nestjs/common");
const brand_interface_1 = require("../../shared/interfaces/brand.interface");
const contact_interface_1 = require("../../shared/interfaces/contact.interface");
const schedule_interface_1 = require("../../shared/interfaces/schedule.interface");
const shipping_interface_1 = require("../../shared/interfaces/shipping.interface");
const configs_service_1 = require("./configs.service");
let ConfigsController = class ConfigsController {
    constructor(configsService) {
        this.configsService = configsService;
    }
    async createConfigs() {
        const configs = this.configsService.createCongigs();
        return configs;
    }
    async getConfigs() {
        return this.configsService.getConfigs();
    }
    async updateName(id, name) {
        return this.configsService.updateName(id, name);
    }
    async updateCategories(id, categories) {
        return this.configsService.updateCategories(id, categories);
    }
    async updateBrands(id, brands) {
        return this.configsService.updateBrands(id, brands);
    }
    async updateShipping(id, shipping) {
        return this.configsService.updateShipping(id, shipping);
    }
    async updateContact(id, contact) {
        return this.configsService.updateContact(id, contact);
    }
    async updateSchedule(id, schedule) {
        return this.configsService.updateSchedule(id, schedule);
    }
};
__decorate([
    common_1.Post(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ConfigsController.prototype, "createConfigs", null);
__decorate([
    common_1.Get(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ConfigsController.prototype, "getConfigs", null);
__decorate([
    common_1.Put(':id/websiteName'),
    __param(0, common_1.Param('id')), __param(1, common_1.Body('name')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], ConfigsController.prototype, "updateName", null);
__decorate([
    common_1.Put(':id/websiteCategories'),
    __param(0, common_1.Param('id')),
    __param(1, common_1.Body('categories')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Array]),
    __metadata("design:returntype", Promise)
], ConfigsController.prototype, "updateCategories", null);
__decorate([
    common_1.Put(':id/websiteBrands'),
    __param(0, common_1.Param('id')),
    __param(1, common_1.Body('brands')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Array]),
    __metadata("design:returntype", Promise)
], ConfigsController.prototype, "updateBrands", null);
__decorate([
    common_1.Put(':id/websiteShipping'),
    __param(0, common_1.Param('id')),
    __param(1, common_1.Body('shipping')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Array]),
    __metadata("design:returntype", Promise)
], ConfigsController.prototype, "updateShipping", null);
__decorate([
    common_1.Put(':id/websiteContact'),
    __param(0, common_1.Param('id')),
    __param(1, common_1.Body('contact')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], ConfigsController.prototype, "updateContact", null);
__decorate([
    common_1.Put(':id/websiteSchedule'),
    __param(0, common_1.Param('id')),
    __param(1, common_1.Body('schedule')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], ConfigsController.prototype, "updateSchedule", null);
ConfigsController = __decorate([
    common_1.Controller('website'),
    __metadata("design:paramtypes", [configs_service_1.ConfigsService])
], ConfigsController);
exports.ConfigsController = ConfigsController;
//# sourceMappingURL=configs.controllers.js.map