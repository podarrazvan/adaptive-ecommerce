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
exports.UploadImageController = void 0;
const common_1 = require("@nestjs/common");
const platform_express_1 = require("@nestjs/platform-express");
const multer_1 = require("multer");
const path_1 = require("path");
const rxjs_1 = require("rxjs");
let UploadImageController = class UploadImageController {
    uploadedFile(file) {
        const path = `http://localhost:3000/images/${file.originalname}`;
        return { url: path };
    }
    findProfileImage(imagename, res) {
        return rxjs_1.of(res.sendFile(path_1.join(process.cwd(), '../images/' + imagename)));
    }
};
__decorate([
    common_1.Post(),
    common_1.UseInterceptors(platform_express_1.FileInterceptor('image', {
        storage: multer_1.diskStorage({
            destination: '../images',
            filename: (req, file, callback) => {
                callback(null, file.originalname);
            },
        }),
    })),
    __param(0, common_1.UploadedFile()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], UploadImageController.prototype, "uploadedFile", null);
__decorate([
    common_1.Get(':imagename'),
    __param(0, common_1.Param('imagename')), __param(1, common_1.Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", rxjs_1.Observable)
], UploadImageController.prototype, "findProfileImage", null);
UploadImageController = __decorate([
    common_1.Controller('images')
], UploadImageController);
exports.UploadImageController = UploadImageController;
//# sourceMappingURL=upload-image.controllers.js.map