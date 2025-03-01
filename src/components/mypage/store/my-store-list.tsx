'use client';

import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

import CommonPagination from '@/components/common/common-pagination';
import { Button } from '@/components/ui/button';
import Empty from '@/components/ui/empty';
import { PATH } from '@/constants/path';
import { useMyInfoQuery } from '@/service/auth/use-service';
import {
  useMyProducts,
  useRepublishProductMutation,
  useToggleProductStatus,
} from '@/service/mypage/use-service';
import { useDeleteStoreMutation } from '@/service/store/use-service';

import { EmptySlot } from './empty-slot';
import MyStoreCard from './my-store-card';

export default function MyStoreList() {
  const { data: myInfo } = useMyInfoQuery();
  const { data } = useMyProducts();
  const { mutate: deleteStoreMutate } = useDeleteStoreMutation();
  const { mutate: toggleProductStatus } = useToggleProductStatus();
  const { mutate: republishProductMutate } = useRepublishProductMutation();
  const searchParams = useSearchParams();
  const page = Number(searchParams.get('page') ?? '1');
  const isPending = searchParams.get('isPending') === 'true';

  if (!data) return null;

  const { count, list } = data;

  const remainingSlots = myInfo?.leftSlots ?? 0;

  if (count === 0)
    return (
      <Empty>
        {isPending ? '대기중인 슬롯이 없어요' : '올린 판매글이 없어요'}
      </Empty>
    );

  return (
    <section className="flex flex-col gap-[20px]">
      <ul className="flex flex-col gap-[20px] mt-[40px]">
        {list.map((cardProps) => (
          <li key={cardProps.title}>
            <MyStoreCard
              {...cardProps}
              onDeleteClick={() => deleteStoreMutate(cardProps.productId)}
              onToggleStatusClick={(isClosed) => {
                toggleProductStatus({
                  id: cardProps.productId,
                  isClosed: !isClosed,
                });
              }}
              onRepublishClick={() =>
                republishProductMutate(cardProps.productId)
              }
            />
          </li>
        ))}
        {!isPending &&
          Array.from({ length: remainingSlots }).map((_, index) => (
            <li key={index}>
              <EmptySlot />
            </li>
          ))}
      </ul>

      {remainingSlots === 0 && (
        <div className="flex items-center justify-between p-[20px] bg-pink-tint-5 border border-pink-100 rounded-[4px]">
          <span className="typo-body-14-regular-150-tight text-pink-500">
            판매 슬롯을 다 소진하였습니다. 추가로 오픈하시겠습니까?
          </span>
          <Button
            asChild
            size="sm"
            className="w-[100px]"
          >
            <Link href={PATH.membershipIntro}>업그레이드</Link>
          </Button>
        </div>
      )}

      {count > 10 && (
        <CommonPagination
          currentPage={page}
          totalItems={count}
          itemsPerPage={10}
          getHref={(page) => `?page=${page}`}
        />
      )}
    </section>
  );
}
