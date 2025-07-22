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
exports.OfferController = void 0;
const common_1 = require("@nestjs/common");
const offer_service_1 = require("./offer.service");
const swagger_1 = require("@nestjs/swagger");
let OfferController = class OfferController {
    constructor(offerService) {
        this.offerService = offerService;
    }
    async createOffers(body) {
        if (!body || typeof body !== 'object' || !body.flipkartOfferApiResponse) {
            throw new common_1.BadRequestException('Request body must have a flipkartOfferApiResponse field');
        }
        return this.offerService.createOffers(body.flipkartOfferApiResponse);
    }
    async getHighestDiscount(amountToPay, bankName, paymentInstrument) {
        if (!amountToPay || !bankName) {
            throw new common_1.BadRequestException('amountToPay and bankName are required query parameters');
        }
        const discount = await this.offerService.getHighestDiscount(Number(amountToPay), bankName, paymentInstrument);
        return { highestDiscountAmount: discount };
    }
};
exports.OfferController = OfferController;
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiBody)({
        schema: {
            type: 'object',
            properties: {
                flipkartOfferApiResponse: { type: 'object' },
            },
            required: ['flipkartOfferApiResponse'],
        },
        description: 'The full response from Flipkart offer API.'
    }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], OfferController.prototype, "createOffers", null);
__decorate([
    (0, common_1.Get)('/highest-discount'),
    (0, swagger_1.ApiQuery)({ name: 'amountToPay', type: Number }),
    (0, swagger_1.ApiQuery)({ name: 'bankName', type: String }),
    (0, swagger_1.ApiQuery)({ name: 'paymentInstrument', type: String, required: false }),
    __param(0, (0, common_1.Query)('amountToPay')),
    __param(1, (0, common_1.Query)('bankName')),
    __param(2, (0, common_1.Query)('paymentInstrument')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String]),
    __metadata("design:returntype", Promise)
], OfferController.prototype, "getHighestDiscount", null);
exports.OfferController = OfferController = __decorate([
    (0, swagger_1.ApiTags)('offer'),
    (0, common_1.Controller)('offer'),
    __metadata("design:paramtypes", [offer_service_1.OfferService])
], OfferController);
//# sourceMappingURL=offer.controller.js.map