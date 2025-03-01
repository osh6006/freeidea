import { membershipPaymentSchema } from '@/lib/zod/membership/schema';
import { z } from 'zod';

export type MembershipType = 'FREE' | 'LITE' | 'PLUS' | 'VIP';

export type MembershipPaymentSchema = z.infer<typeof membershipPaymentSchema>;

export type PaymentMethodType =
  | 'PaymentMethodCard'
  | 'PaymentMethodEasyPay'
  | 'PaymentMethodGiftCertificate'
  | 'PaymentMethodMobile'
  | 'PaymentMethodTransfer'
  | 'PaymentMethodVirtualAccount';

export interface MyMembership {
  membershipType: MembershipType;
  startedAt: string;
  finishedAt: string;
  cancelledAt?: string;
  reservedMembership?: {
    membershipType: MembershipType;
    startedAt: string;
    finishedAt: string;
  };
}

export interface MyMembershipPayment {
  membershipOrderId: string;
  orderNumber: string;
  membershipType: MembershipType;
  orderedAt: string;
  paidAmount: number;
  startedAt: string;
  finishedAt: string;
  paymentMethod: PaymentMethodType;
}
