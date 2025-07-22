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
Object.defineProperty(exports, "__esModule", { value: true });
exports.OfferService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma.service");
let OfferService = class OfferService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async createOffers(flipkartOfferApiResponse) {
        const offers = this.extractOffers(flipkartOfferApiResponse);
        let noOfNewOffersCreated = 0;
        for (const offer of offers) {
            try {
                await this.prisma.offer.create({ data: offer });
                noOfNewOffersCreated++;
            }
            catch (e) {
            }
        }
        return { noOfOffersIdentified: offers.length, noOfNewOffersCreated };
    }
    extractOffers(apiResponse) {
        if (!apiResponse.offers || !Array.isArray(apiResponse.offers))
            return [];
        return apiResponse.offers.map((o) => ({
            title: o.title || '',
            description: o.description || '',
            bankName: o.bankName || '',
            discountType: o.discountType || '',
            discountValue: o.discountValue || 0,
            paymentInstruments: o.paymentInstruments || [],
            validity: o.validity || null,
        }));
    }
    async getHighestDiscount(amountToPay, bankName, paymentInstrument) {
        const where = { bankName };
        if (paymentInstrument) {
            where.paymentInstruments = { has: paymentInstrument };
        }
        const offers = await this.prisma.offer.findMany({ where });
        let maxDiscount = 0;
        for (const offer of offers) {
            let discount = 0;
            if (offer.discountType === 'FLAT') {
                discount = offer.discountValue;
            }
            else if (offer.discountType === 'PERCENTAGE') {
                discount = amountToPay * (offer.discountValue / 100);
            }
            if (discount > maxDiscount)
                maxDiscount = discount;
        }
        return Math.floor(maxDiscount);
    }
};
exports.OfferService = OfferService;
exports.OfferService = OfferService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], OfferService);
//# sourceMappingURL=offer.service.js.map