import { PropsWithChildren } from 'react';

import { cn, formatCurrency } from '@/lib/utils';

import ImageWithFallback from '../common/image-with-fallback';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTrigger,
} from '../ui/dialog';

interface ChatMessageWrapperProps {
  position: 'left' | 'right';
  className?: string;
}

export function ChatMessageWrapper({
  children,
  position,
  className,
}: PropsWithChildren<ChatMessageWrapperProps>) {
  return (
    <div
      className={cn(
        'whitespace-pre-line break-words bg-white rounded-[6px] border border-border p-[16px] w-fit typo-body-14-regular-150-tight overflow-hidden',
        position === 'right' && 'bg-pink-50 border-pink-500 self-end',
        className
      )}
    >
      {children}
    </div>
  );
}

interface ChatDefaultMessageProps extends ChatMessageWrapperProps {
  message: string;
}

export function ChatDefaultMessage({
  message,
  position,
}: ChatDefaultMessageProps) {
  return <ChatMessageWrapper position={position}>{message}</ChatMessageWrapper>;
}

interface ChatOptionItemProps extends ChatMessageWrapperProps {
  options?: {
    optionId: string;
    optionName: string;
    optionPrice: number;
    optionQuantity: number;
  }[];
  additionalFee?: number;
  totalAmount: number;
}

export function ChatOptionMessage({
  options,
  position,
  additionalFee,
  totalAmount,
}: ChatOptionItemProps) {
  const textStyle = {
    medium: 'typo-body-14-medium-100-tight',
    bold: 'typo-body-14-bold-100-tight',
  };

  return (
    <ChatMessageWrapper
      position={position}
      className="max-w-[350px] w-full flex flex-col px-[20px] py-0 "
    >
      {
        <ul className="flex flex-col divide-y divide-border [&>li]:last:border-b-0">
          {options?.map(
            ({ optionId, optionName, optionPrice, optionQuantity }) => (
              <li
                key={optionId}
                className="flex justify-between py-[20px]"
              >
                <span className={textStyle.medium}>
                  {optionName} * {optionQuantity}
                </span>
                <span className={textStyle.bold}>
                  {formatCurrency(optionPrice * optionQuantity)}원
                </span>
              </li>
            )
          )}

          {!!additionalFee && (
            <li className="flex justify-between py-[20px]">
              <span className={cn(textStyle.medium, 'text-pink-500')}>
                추가 금액
              </span>
              <span className={textStyle.bold}>
                {formatCurrency(additionalFee)}원
              </span>
            </li>
          )}
        </ul>
      }

      <div className="flex justify-between bg-pink-50 p-[20px] -mx-[20px]">
        <span className={textStyle.bold}>총금액</span>
        <span className={textStyle.bold}>{formatCurrency(totalAmount)}원</span>
      </div>
    </ChatMessageWrapper>
  );
}

interface ChatImageMessageProps extends ChatMessageWrapperProps {
  imageUrl: string;
}

export function ChatImageMessage({
  imageUrl,
  position,
}: ChatImageMessageProps) {
  return (
    <ChatMessageWrapper
      position={position}
      className="relative max-w-[300px] w-full aspect-square p-0"
    >
      <Dialog>
        <DialogTrigger>
          <ImageWithFallback
            src={imageUrl}
            alt="chat image"
            fill
            className="object-cover"
            sizes="100vw"
          />
        </DialogTrigger>
        <DialogContent className="bg-transparent border-none shadow-none max-w-none max-h-none size-full">
          <DialogClose>
            <ImageWithFallback
              src={imageUrl}
              alt="chat image"
              fill
              className="object-contain"
              sizes="100vw"
              placeholder="empty"
              quality={100}
            />
          </DialogClose>
        </DialogContent>
      </Dialog>
    </ChatMessageWrapper>
  );
}
