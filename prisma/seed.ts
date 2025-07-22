import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  await prisma.offer.createMany({
    data: [
      {
        title: '10% Instant Discount on Axis Bank Credit Cards',
        description: 'Get 10% off up to ₹500 on Axis Bank Credit Cards.',
        bankName: 'AXIS',
        discountType: 'PERCENTAGE',
        discountValue: 10,
        paymentInstruments: ['CREDIT'],
        validity: '2024-07-01 to 2024-07-31',
      },
      {
        title: 'Flat ₹1000 off on IDFC FIRST Bank EMI',
        description: 'Flat ₹1000 off on IDFC FIRST Bank Credit Card EMI transactions.',
        bankName: 'IDFC',
        discountType: 'FLAT',
        discountValue: 1000,
        paymentInstruments: ['EMI'],
        validity: '2024-07-01 to 2024-07-31',
      },
      {
        title: '5% Cashback on HDFC Bank Debit Cards',
        description: 'Get 5% cashback up to ₹300 on HDFC Bank Debit Cards.',
        bankName: 'HDFC',
        discountType: 'PERCENTAGE',
        discountValue: 5,
        paymentInstruments: ['DEBIT'],
        validity: '2024-07-01 to 2024-07-31',
      },
      {
        title: 'Flat ₹200 off on SBI Credit Cards',
        description: 'Flat ₹200 off on SBI Credit Card transactions.',
        bankName: 'SBI',
        discountType: 'FLAT',
        discountValue: 200,
        paymentInstruments: ['CREDIT'],
        validity: '2024-07-01 to 2024-07-31',
      },
      {
        title: '15% Instant Discount on ICICI Bank Credit Cards',
        description: 'Get 15% off up to ₹750 on ICICI Bank Credit Cards.',
        bankName: 'ICICI',
        discountType: 'PERCENTAGE',
        discountValue: 15,
        paymentInstruments: ['CREDIT'],
        validity: '2024-07-01 to 2024-07-31',
      },
      {
        title: 'Flat ₹500 off on Kotak Bank EMI',
        description: 'Flat ₹500 off on Kotak Bank Credit Card EMI transactions.',
        bankName: 'KOTAK',
        discountType: 'FLAT',
        discountValue: 500,
        paymentInstruments: ['EMI'],
        validity: '2024-07-01 to 2024-07-31',
      },
      {
        title: '20% Cashback on Yes Bank Credit Cards',
        description: 'Get 20% cashback up to ₹1000 on Yes Bank Credit Cards.',
        bankName: 'YES',
        discountType: 'PERCENTAGE',
        discountValue: 20,
        paymentInstruments: ['CREDIT'],
        validity: '2024-07-01 to 2024-07-31',
      },
      {
        title: 'Flat ₹300 off on Federal Bank Debit Cards',
        description: 'Flat ₹300 off on Federal Bank Debit Card transactions.',
        bankName: 'FEDERAL',
        discountType: 'FLAT',
        discountValue: 300,
        paymentInstruments: ['DEBIT'],
        validity: '2024-07-01 to 2024-07-31',
      },
      {
        title: '10% Instant Discount on IndusInd Bank Credit Cards',
        description: 'Get 10% off up to ₹400 on IndusInd Bank Credit Cards.',
        bankName: 'INDUSIND',
        discountType: 'PERCENTAGE',
        discountValue: 10,
        paymentInstruments: ['CREDIT'],
        validity: '2024-07-01 to 2024-07-31',
      },
      {
        title: 'Flat ₹250 off on RBL Bank EMI',
        description: 'Flat ₹250 off on RBL Bank Credit Card EMI transactions.',
        bankName: 'RBL',
        discountType: 'FLAT',
        discountValue: 250,
        paymentInstruments: ['EMI'],
        validity: '2024-07-01 to 2024-07-31',
      },
    ],
    skipDuplicates: true,
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  }); 