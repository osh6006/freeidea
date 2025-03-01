import OrderList from '@/components/membership/order-list';
import PaymentFormProvider from '@/components/membership/payment-form-provider';
import PaymentMethodsSection from '@/components/membership/payment-methods-section';
import MembershipPaymentSidebar from '@/components/membership/payment-side-bar';

interface Props {
  searchParams: {
    level?: string;
  };
}

export default function Payment({ searchParams }: Props) {
  const level = searchParams.level;

  if (!(level === 'LITE' || level === 'PLUS' || level === 'VIP'))
    throw new Error('level is invalid');

  return (
    <PaymentFormProvider defaultValues={{ level }}>
      <main className="w-[1200px] mx-auto flex gap-[60px] pb-[200px]">
        <div className="flex-1 [&_h2]:typo-title-18-bold-100 flex flex-col gap-[40px]">
          <OrderList level={level} />
          <PaymentMethodsSection />
        </div>
        <MembershipPaymentSidebar />
      </main>
    </PaymentFormProvider>
  );
}
