import ImageWithFallback from '@/components/common/image-with-fallback';
import { CommonAvatar } from '@/components/ui/avatar';
import { Textarea } from '@/components/ui/textarea';
import {
  Tooltip,
  TooltipContent,
  TooltipTitle,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { useMyInfoQuery } from '@/service/auth/use-service';
import {
  FeedProduct,
  useFeedWriteActions,
  useFeedWriteStates,
} from '@/store/feed/write';

import { FeedWriteCarousel } from './carousel';

const FeedWriteStepThree = () => {
  const { data: myInfo } = useMyInfoQuery();
  const { selectedFileInfos, contents } = useFeedWriteStates();
  const { setContents } = useFeedWriteActions();

  const products = selectedFileInfos.flatMap(
    (fileInfo) =>
      fileInfo.products?.filter(
        (product): product is FeedProduct => !!product
      ) || []
  );

  return (
    <div className="py-[20px]">
      <div className="flex px-[40px] gap-x-[20px]">
        <Tooltip defaultOpen>
          <TooltipTrigger>
            <FeedWriteCarousel />
          </TooltipTrigger>
          <TooltipContent>
            <TooltipTitle>
              판매 작품을 태그하려면 이미지를 클릭해주세요
            </TooltipTitle>
          </TooltipContent>
        </Tooltip>
        <div className="flex-1 flex flex-col gap-y-[10px]">
          <div className="flex gap-x-2 items-center">
            <CommonAvatar
              nickname={myInfo?.nickname}
              src={myInfo?.profileImageUrl}
              className="size-10"
            />
            <span className="text-slate-600 typo-body-14-regular-150-tight">
              {myInfo?.nickname}
            </span>
          </div>
          <div className="flex-1 bg-slate-100">
            <Textarea
              value={contents}
              className="h-full resize-none"
              placeholder="피드를 작성해주세요"
              onChange={(e) => setContents(e.target.value)}
            />
          </div>
        </div>
      </div>
      <div className="flex  bg-slate-50 roun items-center mx-[40px] mt-[20px] h-[60px]">
        <span className="w-[120px] px-[10px] typo-body-14-semi-bold-100-tight">
          태그된 판매 작품
        </span>
        <ul className="flex flex-wrap gap-x-[10px]">
          {products.map((product) => (
            <ImageWithFallback
              width={60}
              height={60}
              key={product.productId}
              src={product.productImageUrl}
              alt="product-thumbnail"
              className="aspect-square rounded-[4px]"
            />
          ))}
        </ul>
      </div>
    </div>
  );
};

export default FeedWriteStepThree;
