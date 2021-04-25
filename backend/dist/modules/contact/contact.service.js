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
exports.ContactService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
let ContactService = class ContactService {
    constructor(contactModel) {
        this.contactModel = contactModel;
    }
    async createEmail(data) {
        const { name, email, subject, message, date, seen } = data;
        const emailData = {
            name,
            email,
            subject,
            message,
            date,
            seen,
        };
        const newEmail = new this.contactModel(emailData);
        const result = await newEmail.save();
        return result;
    }
    async getEmails() {
        const result = await this.contactModel.find().exec();
        return result;
    }
    async updateEmail(_id, status) {
        const result = await this.contactModel
            .findByIdAndUpdate({ _id }, { status })
            .exec();
        return result;
    }
};
ContactService = __decorate([
    common_1.Injectable(),
    __param(0, mongoose_1.InjectModel('Contact')),
    __metadata("design:paramtypes", [mongoose_2.Model])
], ContactService);
exports.ContactService = ContactService;
//# sourceMappingURL=contact.service.js.map