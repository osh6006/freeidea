import { useMemo } from 'react';

import Link from 'next/link';
import { useParams } from 'next/navigation';

import { buttonVariants } from '@/components/ui/button';
import { CardThumbnail, CardThumbnailImage } from '@/components/ui/card';
import Spinner from '@/components/ui/spinner';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { PATH } from '@/constants/path';
import { useMyInfoQuery } from '@/service/auth/use-service';
import { useStudioAuthorBoardSlotQuery } from '@/service/studio/use-service';
import { IProduct } from '@/types/common';
import { Lock01 } from '@untitled-ui/icons-react';

import BoardEmpty from '../board/board-empty';

const generateSlots = (
  unlockedSlots: number,
  totalSlots: number,
  products: IProduct[]
) => {
  return Array.from({ length: totalSlots }, (_, i) =>
    i < unlockedSlots ? products[i] || undefined : undefined
  );
};

const SlotItem = ({
  slot,
  isLocked,
}: {
  slot?: IProduct;
  isLocked: boolean;
}) => {
  const tooltipTitle = isLocked ? '잠겨있는 판매슬롯' : '판매슬롯';
  const tooltipDescription = isLocked
    ? '판매목록이 잠겨 있어요'
    : slot?.productId
      ? '판매페이지로 이동해보세요'
      : '판매목록이 비어있어요';

  return (
    <Tooltip>
      <TooltipTrigger>
        <li className="relative rounded-[10px] size-[126px] aspect-square border overflow-hidden">
          {isLocked ? (
            <div className="absolute inset-0 flex items-center justify-center bg-slate-300 text-white ">
              <Lock01
                width={30}
                height={30}
              />
            </div>
          ) : slot?.productId ? (
            <Link href={PATH.workDetail(slot.productId)}>
              <CardThumbnail className="border-none">
                <CardThumbnailImage
                  src={slot.productImageUrl}
                  alt="slot-image"
                  fill
                  style={{
                    objectFit: 'contain',
                  }}
                />
              </CardThumbnail>
            </Link>
          ) : (
            <div className="absolute inset-0 flex items-center justify-center bg-slate-200" />
          )}
        </li>
      </TooltipTrigger>
      <TooltipContent side="bottom">
        <div className="typo-body-14-regular-150-tight text-white">
          {tooltipTitle}
        </div>
        <div className="typo-body-14-regular-150-tight text-slate-400">
          {tooltipDescription}
        </div>
      </TooltipContent>
    </Tooltip>
  );
};

const TabSlot = () => {
  const totalSlots = 12;
  const { id }: { id: string } = useParams();
  const { data, isLoading } = useStudioAuthorBoardSlotQuery(id);
  const { data: myInfo } = useMyInfoQuery();

  const slotList = useMemo(() => {
    if (!data) return [];
    return generateSlots(data.slots, totalSlots, data.products);
  }, [data, totalSlots]);

  if (isLoading) {
    return (
      <div className="w-full h-[300px] flex items-center justify-center ">
        <Spinner />
      </div>
    );
  }

  if (!data) {
    return <BoardEmpty>데이터를 불러오지 못했습니다.</BoardEmpty>;
  }

  const isMe = myInfo?.studioId === id;

  return (
    <>
      <ul className="grid grid-cols-6 gap-5 my-5">
        {slotList.map((slot, i) => (
          <SlotItem
            key={slot?.productId || `empty-${i}`}
            slot={slot}
            isLocked={i >= data.slots}
          />
        ))}
      </ul>
      {isMe ? (
        <div className="border-t border-slate-200 py-6">
          <Link
            href={PATH.membershipIntro}
            className={buttonVariants({
              className: 'w-full',
              size: 'lg',
            })}
          >
            슬롯 추가 열기
          </Link>
        </div>
      ) : null}
    </>
  );
};

export default TabSlot;
