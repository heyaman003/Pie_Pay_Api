import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';

@Injectable()
export class OfferService {
  constructor(private prisma: PrismaService) {}

  // Extract and store offers from Flipkart API response
  async createOffers(flipkartOfferApiResponse: any): Promise<{ noOfOffersIdentified: number; noOfNewOffersCreated: number }> {
    // TODO: Adjust extraction logic based on actual Flipkart API structure
    const offers = this.extractOffers(flipkartOfferApiResponse);
    let noOfNewOffersCreated = 0;
    for (const offer of offers) {
      try {
        await this.prisma.offer.create({ data: offer });
        noOfNewOffersCreated++;
      } catch (e) {
        // Unique constraint violation: skip duplicates
      }
    }
    return { noOfOffersIdentified: offers.length, noOfNewOffersCreated };
  }

  // Extract offers from Flipkart API response (adjust as needed)
  extractOffers(apiResponse: any) {
    // Example: apiResponse.offers is an array
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
