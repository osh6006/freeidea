import React from 'react';

import ImageWithFallback from '@/components/common/image-with-fallback';
import { Button } from '@/components/ui/button';
import {
  FeedPopOverContent,
  Popover,
  PopoverTrigger,
} from '@/components/ui/popover';
import { formatCurrency } from '@/lib/utils';
import { FeedProduct, useFeedWriteActions } from '@/store/feed/write';
import { Plus } from '@untitled-ui/icons-react';

const FeedProductTag = ({
  posY,
  posX,
  size,
  isOpen,
  onClose,
  onOpenChange,
  product,
  fileIdx,
  tagIdx,
}: {
  fileIdx: number;
  tagIdx: number;
  posX: number;
  posY: number;
  size: number;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onClose: () => void;
  product: FeedProduct;
}) => {
  const { deleteTag } = useFeedWriteActions();

  return (
    <div
      style={{
        position: 'absolute',
        top: posY * size,
        left: posX * size,
        borderRadius: '50%',
        transform: 'translate(-50%, -50%)',
        zIndex: 500,
      }}
      onClick={(e) => e.preventDefault()}
    >
      <Popover
        modal
        open={isOpen}
        onOpenChange={onOpenChange}
      >
        <PopoverTrigger asChild>
          <button
            onClick={(e) => e.stopPropagation()}
            className="bg-primary size-[30px] rounded-full flex items-center justify-center"
          >
            <Plus className="text-white" />
          </button>
        </PopoverTrigger>
        <FeedPopOverContent
          className="w-[360px] max-h-[400px] py-[20px] px-[10px]"
          onPointerDownOutside={(e) => e.preventDefault()}
        >
          <div
            key={product.productId}
            onSelect={() => {
              return;
            }}
            className="flex w-full items-center justify-between"
          >
            <span className="flex gap-x-[10px]">
              <ImageWithFallback
                width={60}
                height={60}
                src={product.productImageUrl}
                alt="product-img"
                className="border border-slate-200 rounded-[6px] aspect-square"
              />
              <div className="flex flex-col justify-around">
                <div className="text-slate-500 typo-caption-12-bold-100-tight">
                  {product.nickname}
                </div>
                <div className="typo-body-16-regular-150">{product.title}</div>
                <div className="typo-body-16-bold-100-tight">
                  {formatCurrency(product.price)}원
                </div>
              </div>
            </span>
            <Button
              variant="outline"
              onClick={() => {
                deleteTag({
                  fileIdx,
                  tagIdx,
                });
                onClose();
              }}
            >
              삭제
            </Button>
          </div>
        </FeedPopOverContent>
      </Popover>
    </div>
  );
};

export default FeedProductTag;
