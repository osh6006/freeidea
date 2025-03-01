import { MEMBERSHIP_OPTION } from '@/constants/membership/option';
import { MembershipType } from '@/types/membership';

import PaymentOrderListSection from '../common/payment/payment-order-list-section';

export default function OrderList({ level }: { level: MembershipType }) {
  const option = MEMBERSHIP_OPTION[level];

  if (!option) throw new Error('option not found.');

  return (
    <PaymentOrderListSection
      benefits={Array.from(option.benefits)}
      options={[{ title: option.title, price: option.price }]}
    />
  );
}
