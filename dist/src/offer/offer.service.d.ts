import { PrismaService } from '../prisma.service';
export declare class OfferService {
    private prisma;
    constructor(prisma: PrismaService);
    createOffers(flipkartOfferApiResponse: any): Promise<{
        noOfOffersIdentified: number;
        noOfNewOffersCreated: number;
    }>;
    extractOffers(apiResponse: any): any;
    getHighestDiscount(amountToPay: number, bankName: string, paymentInstrument?: string): Promise<number>;
}
