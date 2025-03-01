import { z } from 'zod';

export const membershipPaymentSchema = z.object({
  level: z.enum(['FREE', 'LITE', 'PLUS', 'VIP']),
  payMethod: z.enum([
    'card',
    'tossPay',
    'mobile',
    'naverPay',
    'kakaoPay',
    'payco',
  ]),
  agreement: z.literal<boolean>(true),
});
