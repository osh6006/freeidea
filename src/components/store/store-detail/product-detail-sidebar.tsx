'use client';

import { useFieldArray, useFormContext } from 'react-hook-form';

import { useParams } from 'next/navigation';

import { SecureButton } from '@/components/common/secure-button';
import { Icon } from '@/components/icon';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from '@/components/ui/form';
import { ScrollArea } from '@/components/ui/scroll-area';
import { cn, formatCurrency } from '@/lib/utils';
import { useMyInfoQuery } from '@/service/auth/use-service';
import { useSendChatMutation } from '@/service/chat/use-service';
import { useStoreDetailQuery } from '@/service/store/use-service';
import { WorkOrderSchemaType } from '@/types/work';
import { ChevronDown } from '@untitled-ui/icons-react';

import CountButtonGroup from './count-button-group';
import { useWorkDetailScrapMutation } from './hooks';
import ProductDeatilAddedItem from './product-added-item';
import { useProductChatDialogStore } from './product-chat';

export default function ProductDetailSidebar() {
  const { control, watch, setValue } = useFormContext<WorkOrderSchemaType>();
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'options',
  });

  const { id } = useParams<{ id: string }>();
  const { data } = useStoreDetailQuery(id);

  if (!data) return;

  const increase = (value: number) => value + 1;
  const decrease = (value: number) => Math.max(value - 1, 1);

  return (
    <aside
      className={cn(
        'flex flex-col sticky w-[410px] top-[80px] p-[30px] h-[calc(100vh-80px)] '
      )}
    >
      {/* select */}
      <div className="space-y-[10px]">
        {data.optionGroups.map(
          ({ optionGroupId, optionGroupName, options }) => (
            <FormField
              key={optionGroupId}
              control={control}
              name="options"
              render={({ field }) => (
                <FormItem>
                  <DropdownMenu>
                    <FormControl ref={field.ref}>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="outline"
                          className="w-full flex justify-between"
                        >
                          <span>{optionGroupName}</span>
                          <ChevronDown className="size-[20px]" />
                        </Button>
                      </DropdownMenuTrigger>
                    </FormControl>
                    <DropdownMenuContent className="w-[350px]">
                      {options.map(({ optionId, optionName, optionPrice }) => (
                        <DropdownMenuCheckboxItem
                          key={optionId}
                          checked={field.value.some(
                            ({ optionId: fieldOptionId }) =>
                              optionId === fieldOptionId
                          )}
                          className="w-full flex justify-between"
                          onCheckedChange={(checked) => {
                            if (!checked) return;
                            const newOption = {
                              optionGroupId,
                              optionId,
                              optionName,
                              optionPrice,
                              optionQuantity: 1,
                            };
                            append(newOption);
                          }}
                        >
                          <span>{optionName}</span>
                          <span>{formatCurrency(optionPrice)}원</span>
                        </DropdownMenuCheckboxItem>
                      ))}
                    </DropdownMenuContent>
                  </DropdownMenu>
                </FormItem>
              )}
            />
          )
        )}
      </div>

      {/* add money */}
      <div className="flex w-full justify-between items-center mt-[10px] p-[20px] bg-pink-tint-5 border border-pink-100 rounded-sm">
        <FormField
          control={control}
          name="additional.checked"
          render={({ field }) => (
            <FormItem className="flex flex-1 gap-x-[10px] items-start">
              <FormControl ref={field.ref}>
                <Checkbox
                  checked={!!field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <FormLabel className="flex flex-col gap-[6px]">
                <div className="typo-body-16-medium-100-tight text-slate-800 ">
                  추가금액
                </div>
                <div className="typo-body-14-semi-bold-100-tight text-primary">
                  1,000원씩 추가
                </div>
              </FormLabel>
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name="additional.count"
          render={({ field }) => (
            <FormItem>
              <CountButtonGroup
                count={field.value}
                onMinusClick={() => {
                  field.onChange(decrease(field.value));
                }}
                onPlusClick={() => {
                  field.onChange(increase(field.value));
                }}
                onCountChange={field.onChange}
              />
            </FormItem>
          )}
        />
      </div>

      {/* options */}

      <ScrollArea className="mt-[14px] bg-slate-tint-5 px-[20px] mb-[10px]">
        <div
          className={cn(
            'flex flex-col divide-y',
            fields.length > 0 || watch('additional.checked')
              ? 'visible'
              : 'hidden'
          )}
        >
          {fields.map(({ id }, index) => (
            <FormField
              key={id}
              control={control}
              name={`options.${index}`}
              render={({ field }) => (
                <FormItem>
                  <ProductDeatilAddedItem
                    name={field.value.optionName}
                    count={field.value.optionQuantity}
                    price={field.value.optionPrice * field.value.optionQuantity}
                    onRemoveClick={() => remove(index)}
                    onCountChange={(count) =>
                      field.onChange({
                        ...field.value,
                        optionQuantity: count,
                      })
                    }
                    onPlusClick={() =>
                      field.onChange({
                        ...field.value,
                        optionQuantity: increase(field.value.optionQuantity),
                      })
                    }
                    onMinusClick={() =>
                      field.onChange({
                        ...field.value,
                        optionQuantity: decrease(field.value.optionQuantity),
                      })
                    }
                  />
                </FormItem>
              )}
            />
          ))}
          {watch('additional.checked') && (
            <FormField
              control={control}
              name="additional.count"
              render={({ field }) => (
                <FormItem>
                  <ProductDeatilAddedItem
                    name="추가 금액"
                    nameStyle="text-pink-500"
                    count={field.value}
                    price={field.value * 1000}
                    onRemoveClick={() => setValue('additional.checked', false)}
                    onCountChange={(count) => field.onChange(count)}
                    onPlusClick={() => field.onChange(increase(field.value))}
                    onMinusClick={() => field.onChange(decrease(field.value))}
                  />
                </FormItem>
              )}
            />
          )}
        </div>
      </ScrollArea>

      {/* result */}
      <SidebarFooter />
    </aside>
  );
}

function SidebarFooter() {
  const { id } = useParams<{ id: string }>();
  const { data } = useStoreDetailQuery(id);
  const { watch, getValues } = useFormContext<WorkOrderSchemaType>();

  const { scrapMutate } = useWorkDetailScrapMutation();
  const { setIsOpen } = useProductChatDialogStore();
  const { data: myInfo } = useMyInfoQuery();
  const { mutate: sendChat } = useSendChatMutation();

  if (!data) return;

  const isMyProduct = data.author.userId === myInfo?.userId;

  const additionalFee = watch('additional.checked')
    ? watch('additional.count') * 1000
    : 0;

  const totalAmount =
    watch('options').reduce(
      (acc, { optionPrice, optionQuantity }) =>
        acc + optionPrice * optionQuantity,
      0
    ) + additionalFee;

  const openChatWithOption = () => {
    setIsOpen(true);

    const options = getValues('options').map(
      ({ optionId, optionName, optionPrice, optionQuantity }) => ({
        optionId,
        optionName,
        optionPrice,
        optionQuantity,
      })
    );

    if (options.length === 0 && !additionalFee) return;

    sendChat({
      receiverUserId: data.author.userId,
      message: {
        chatMessageType: 'ORDER',
        orderOptions: options,
        additionalFee,
        totalAmount,
      },
    });
  };

  return (
    <div
      className={cn('border-t border-border mt-auto flex flex-col gap-[10px]')}
    >
      <div className="py-[20px] flex justify-between items-center typo-body-16-medium-100-tight">
        <span>총 작품 금액</span>
        <span>
          <strong className="typo-title-24-bold-tight">{`${formatCurrency(totalAmount)}`}</strong>
          원
        </span>
      </div>
      {!isMyProduct && (
        <>
          <div className="p-[20px] bg-pink-tint-5 border border-pink-500 rounded-[4px] typo-body-14-regular-150-tight text-pink-500">
            프리디어는 의뢰자와 작가 간의 직접적인 결제를 지원하지 않으며
            작가님께 직접 신청하여 진행해 주시기 바랍니다.
          </div>
          <div className="flex flex-1 h-full w-full gap-x-[10px]">
            <Button
              type="button"
              size="icon-lg"
              variant="outline"
              className="p-[15px] p-0"
              onClick={() => scrapMutate(id, !data.isScrapping)}
            >
              {data.isScrapping ? (
                <Icon.BookmarkSelect className="size-[24px]" />
              ) : (
                <Icon.Bookmark className="size-[24px]" />
              )}
            </Button>
            <Dialog>
              <DialogTrigger asChild>
                <Button
                  type="button"
                  size="lg"
                  variant="outline"
                  className="w-full"
                  asChild
                  disabled={!data.isSelling}
                >
                  <SecureButton requiredLevel={'USER'}>신청하기</SecureButton>
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>잠깐, 주문 옵션을 추가하셨나요?</DialogTitle>
                  <DialogDescription>
                    주문 옵션을 선택하신 후 채팅 문의를 하면 내용이 첨부되요!
                    <br />
                    작가님과 원활하게 대화를 나눠보세요!
                  </DialogDescription>
                </DialogHeader>
                <DialogFooter className="flex flex-col">
                  <DialogClose
                    className="w-full"
                    asChild
                  >
                    <Button
                      type="button"
                      size="lg"
                      variant="outline"
                      onClick={() => setIsOpen(true)}
                    >
                      옵션 첨부 없이 거래할래요
                    </Button>
                  </DialogClose>
                  <DialogClose
                    className="w-full"
                    asChild
                  >
                    <Button
                      type="button"
                      size="lg"
                      variant="accent"
                      onClick={openChatWithOption}
                    >
                      옵션 첨부하기
                    </Button>
                  </DialogClose>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </>
      )}
    </div>
  );
}
