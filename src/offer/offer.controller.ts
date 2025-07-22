import { Controller, Post, Body, Get, Query, BadRequestException } from '@nestjs/common';
import { OfferService } from './offer.service';
import { ApiBody, ApiQuery, ApiTags } from '@nestjs/swagger';

@ApiTags('offer')
@Controller('offer')
export class OfferController {
  constructor(private readonly offerService: OfferService) {}

  @Post()
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        flipkartOfferApiResponse: { type: 'object' },
      },
      required: ['flipkartOfferApiResponse'],
    },
    description: 'The full response from Flipkart offer API.'
  })
  async createOffers(@Body() body: any) {
    if (!body || typeof body !== 'object' || !body.flipkartOfferApiResponse) {
      throw new BadRequestException('Request body must have a flipkartOfferApiResponse field');
    }
    return this.offerService.createOffers(body.flipkartOfferApiResponse);
  }

  @Get('/highest-discount')
  @ApiQuery({ name: 'amountToPay', type: Number })
  @ApiQuery({ name: 'bankName', type: String })
  @ApiQuery({ name: 'paymentInstrument', type: String, required: false })
  async getHighestDiscount(
    @Query('amountToPay') amountToPay: string,
    @Query('bankName') bankName: string,
    @Query('paymentInstrument') paymentInstrument?: string,
  ) {
    if (!amountToPay || !bankName) {
      throw new BadRequestException('amountToPay and bankName are required query parameters');
    }
    const discount = await this.offerService.getHighestDiscount(
      Number(amountToPay),
      bankName,
      paymentInstrument,
    );
    return { highestDiscountAmount: discount };
  }
}
