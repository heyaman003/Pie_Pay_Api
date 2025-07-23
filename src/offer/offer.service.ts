import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';

@Injectable()
export class OfferService {
  constructor(private prisma: PrismaService) {}

  async createOffers(flipkartOfferApiResponse: any): Promise<{ noOfOffersIdentified: number; noOfNewOffersCreated: number }> {
    const offers = this.extractOffers(flipkartOfferApiResponse);
    let noOfNewOffersCreated = 0;
    for (const offer of offers) {
      try {
        await this.prisma.offer.create({ data: offer });
        noOfNewOffersCreated++;
      } catch (e) {
        
      }
    }
    return { noOfOffersIdentified: offers.length, noOfNewOffersCreated };
  }

  extractOffers(apiResponse: any) {
    if (!apiResponse.offers || !Array.isArray(apiResponse.offers)) return [];
    return apiResponse.offers.map((o: any) => ({
      title: o.title || '',
      description: o.description || '',
      bankName: o.bankName || '',
      discountType: o.discountType || '',
      discountValue: o.discountValue || 0,
      paymentInstruments: o.paymentInstruments || [],
      validity: o.validity || null,
    }));
  }

  // Find the highest discount for given payment details
  async getHighestDiscount(amountToPay: number, bankName: string, paymentInstrument?: string): Promise<number> {
    const where: any = { bankName };
    if (paymentInstrument) {
      where.paymentInstruments = { has: paymentInstrument };
    }
    const offers = await this.prisma.offer.findMany({ where });
    let maxDiscount = 0;
    for (const offer of offers) {
      let discount = 0;
      if (offer.discountType === 'FLAT') {
        discount = offer.discountValue;
      } else if (offer.discountType === 'PERCENTAGE') {
        discount = amountToPay * (offer.discountValue / 100);
      }
      if (discount > maxDiscount) maxDiscount = discount;
    }
    return Math.floor(maxDiscount);
  }
}
