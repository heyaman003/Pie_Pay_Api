import { OfferService } from './offer.service';
export declare class OfferController {
    private readonly offerService;
    constructor(offerService: OfferService);
    createOffers(body: any): Promise<{
        noOfOffersIdentified: number;
        noOfNewOffersCreated: number;
    }>;
    getHighestDiscount(amountToPay: string, bankName: string, paymentInstrument?: string): Promise<{
        highestDiscountAmount: number;
    }>;
}
