import OrderCard from '@/components/mypage/order-list/order-card';
import { Separator } from '@/components/ui/separator';
import { MEMBERSHIP_OPTION } from '@/constants/membership/option';
import { formatCurrency } from '@/lib/utils';

async function getOrderDetail(id: string) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(MEMBERSHIP_OPTION.LITE);
    }, 500);
  });
}

async function OrderDetailPage({ params }: { params: { id: string } }) {
  await getOrderDetail(params.id);

  return (
    <main className="mt-[50px] mb-[200px] w-[1200px] mx-auto">
      <h1 className="typo-title-32-bold-150 mb-[20px]">주문 상세</h1>
      <div className="flex gap-[10px] typo-body-16-medium-100-tight mb-[30px] text-slate-500">
        <div className="flex gap-[6px]">
          <span className="typo-body-16-medium-100-tight">주문 일시</span>
          <span className="typo-body-16-bold-100-tight">2024.01.01</span>
        </div>
        <Separator
          orientation="vertical"
          className="h-[10px]"
        />
        <div className="flex gap-[6px]">
          <span className="typo-body-16-medium-100-tight">주문 번호</span>
          <span className="typo-body-16-bold-100-tight">1234567890</span>
        </div>
      </div>

      <section className="flex flex-col gap-[40px]">
        <div className="flex flex-col gap-[12px]">
          <h2 className="typo-title-20-bold-140">주문 내용</h2>
          <OrderCard
            title={'결제 완료'}
            type={'lite'}
            orderDate={'2024.01.01'}
          />
        </div>
        <div className="flex flex-col gap-[12px] p-[30px] border border-border rounded-[10px]">
          <h2 className="typo-title-20-bold-140">결제 정보</h2>
          <div className="flex flex-col gap-[20px]">
            <div className="flex justify-between typo-title-20-bold-100-tight">
              <span>{MEMBERSHIP_OPTION.LITE.title} 멤버십</span>
              <span>{formatCurrency(MEMBERSHIP_OPTION.LITE.price)}원</span>
            </div>
            <Separator />
            <div className="flex justify-between">
              <span className="typo-title-20-medium-tight">총 주문 금액</span>
              <span className="typo-title-28-bold-100">
                {formatCurrency(MEMBERSHIP_OPTION.LITE.price)}원
              </span>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

export default OrderDetailPage;
