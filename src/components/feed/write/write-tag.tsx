'use client';

import { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';

import ImageWithFallback from '@/components/common/image-with-fallback';
import { Button } from '@/components/ui/button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import { Input, inputVariant } from '@/components/ui/input';
import {
  FeedPopOverContent,
  Popover,
  PopoverTrigger,
} from '@/components/ui/popover';
import { ScrollArea } from '@/components/ui/scroll-area';
import Spinner from '@/components/ui/spinner';
import { SECOND } from '@/constants/time';
import { cn } from '@/lib/utils';
import { useFeedSearchQuery } from '@/service/search/use-service';
import { useFeedWriteActions } from '@/store/feed/write';
import { IProduct } from '@/types/common';
import { Plus } from '@untitled-ui/icons-react';
import { useDebounce } from 'use-debounce';

const FeedWriteTag = ({
  fileIdx,
  tagIdx,
  posY,
  posX,
  size,
  isOpen,
  onClose,
  onOpenChange,
}: {
  fileIdx: number;
  tagIdx: number;
  posX: number;
  posY: number;
  size: number;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onClose: () => void;
}) => {
  const { notProductClear, addTagProduct, selectedFileInfos } =
    useFeedWriteActions();

  const [searchValue, setSearchValue] = useState('');
  const [debouncedSearchValue] = useDebounce(searchValue, 0.5 * SECOND);

  const {
    data: productData,
    isLoading,
    isRefetching,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  } = useFeedSearchQuery({
    keyword: debouncedSearchValue || '',
  });
  const { ref, inView } = useInView();

  useEffect(() => {
    if (hasNextPage && !isFetchingNextPage && inView) fetchNextPage();
  }, [hasNextPage, fetchNextPage, isFetchingNextPage, inView]);

  // 중복 제거
  const set = new Set(
    selectedFileInfos.flatMap(
      (el) => el.products?.map((el) => el.productId) || []
    )
  );

  const productList =
    productData?.flattenList.filter(
      (item: IProduct) => !set.has(item.productId)
    ) || [];

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
        defaultOpen
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
          className="w-[360px] max-h-[400px] py-[20px] px-0"
          onPointerDownOutside={(e) => e.preventDefault()}
        >
          <Command
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            <div className="flex w-full justify-between gap-x-[10px] px-[20px]">
              <span className="flex-1">
                <Input
                  placeholder="작품을 검색해 보세요"
                  className={cn(
                    inputVariant,
                    'px-[10px] border border-slate-200 mt-1'
                  )}
                  onChange={(e) => {
                    setSearchValue(e.target.value);
                  }}
                />
              </span>

              <button
                className="p-[10px] typo-body-14-regular-150-tight"
                onClick={() => {
                  notProductClear();
                  onClose();
                }}
              >
                취소
              </button>
            </div>
            {isLoading ? (
              <div className="w-full h-[320px] flex items-center justify-center">
                <Spinner className="size-[45px]" />
              </div>
            ) : productList ? (
              <ScrollArea className="h-[320px] px-[10px] mt-[10px]">
                <CommandList>
                  <CommandEmpty className="mx-auto h-[300px] flex items-center justify-center">
                    찾으시는 작품이 없어요!
                  </CommandEmpty>
                  <CommandGroup className="flex flex-col gap-y-[10px]">
                    {productList?.map((product: IProduct, i: number) => (
                      <CommandItem
                        key={product.productId}
                        value={product.title + i}
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
                            className="border border-slate-200 rounded-[6px] aspect-square bg-cover"
                          />
                          <div>
                            <div>{product.nickname}</div>
                            <div>{product.title}</div>
                          </div>
                        </span>
                        <Button
                          variant="outline"
                          onClick={() => {
                            onClose();
                            addTagProduct({
                              product: {
                                positionX: posX,
                                positionY: posY,
                                productId: product.productId,
                                nickname: product.nickname,
                                price: product.price,
                                productImageUrl: product.productImageUrl,
                                title: product.title,
                                registerStatus: undefined,
                              },
                              fileIdx: fileIdx,
                              tagIdx: tagIdx,
                            });
                          }}
                        >
                          선택
                        </Button>
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </CommandList>
                {isRefetching && (
                  <div className="w-full flex items-center justify-center ">
                    <Spinner />
                  </div>
                )}
                <div ref={ref} />
              </ScrollArea>
            ) : (
              <div className="w-full h-[300px] flex items-center justify-center">
                등록하신 작품이 없어요
              </div>
            )}
          </Command>
        </FeedPopOverContent>
      </Popover>
    </div>
  );
};

export default FeedWriteTag;
