'use client';

import { PropsWithChildren } from 'react';

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { cn } from '@/lib/utils';
import { cva } from 'class-variance-authority';

interface GlobalAlertDialogProps extends PropsWithChildren {
  isOpen?: boolean;
  title?: string;
  desc?: string;
  buttonMode?: 'full-single' | 'full-double' | 'end-double' | 'login';
  textAlign?: 'start' | 'center' | 'end';
  setIsOpen?: (open: boolean) => void;
  onConfirm?: () => void;
  disabled?: boolean;
}

const headerStyles = cva('', {
  variants: {
    textAlign: {
      start: 'text-left',
      center: 'text-center',
      end: 'text-right',
    },
  },
  defaultVariants: {
    textAlign: 'start',
  },
});

const footerStyles = cva('flex mt-4 gap-x-2', {
  variants: {
    buttonMode: {
      'full-single': 'w-full',
      'full-double': 'justify-between',
      'end-double': 'justify-end',
      login: 'justify-between',
    },
  },
});

const CancelButtonStyle = 'w-[68px] h-[40px]';

const GlobalAlertDialog = ({
  isOpen,
  title = '제목을 입력해 주세요',
  desc = '',
  buttonMode = 'end-double',
  textAlign = 'start',
  setIsOpen,
  onConfirm,
  disabled,
}: GlobalAlertDialogProps) => {
  return (
    <AlertDialog
      open={isOpen}
      onOpenChange={setIsOpen}
    >
      <AlertDialogContent className="max-w-[380px] px-[24px]">
        <AlertDialogHeader>
          <AlertDialogTitle
            className={cn(
              'typo-title-24-bold-140-tight',
              headerStyles({ textAlign })
            )}
          >
            {title}
          </AlertDialogTitle>
          <AlertDialogDescription
            className={cn(
              'text-slate-500 typo-body-14-regular-150-tight',
              headerStyles({ textAlign })
            )}
          >
            {desc}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className={cn(footerStyles({ buttonMode }))}>
          {buttonMode === 'full-single' && (
            <AlertDialogAction
              disabled={disabled}
              onClick={onConfirm}
              className={CancelButtonStyle}
            >
              확인
            </AlertDialogAction>
          )}
          {buttonMode === 'full-double' && (
            <>
              <AlertDialogCancel disabled={disabled}>취소</AlertDialogCancel>
              <AlertDialogAction
                disabled={disabled}
                onClick={onConfirm}
                className={CancelButtonStyle}
              >
                확인
              </AlertDialogAction>
            </>
          )}
          {buttonMode === 'end-double' && (
            <>
              <AlertDialogCancel
                disabled={disabled}
                className={CancelButtonStyle}
              >
                취소
              </AlertDialogCancel>
              <AlertDialogAction
                onClick={onConfirm}
                disabled={disabled}
                className={CancelButtonStyle}
              >
                확인
              </AlertDialogAction>
            </>
          )}
          {buttonMode === 'login' && (
            <>
              <AlertDialogCancel
                disabled={disabled}
                className={CancelButtonStyle}
              >
                이전으로
              </AlertDialogCancel>
              <AlertDialogAction
                disabled={disabled}
                onClick={onConfirm}
                className={CancelButtonStyle}
              >
                로그인
              </AlertDialogAction>
            </>
          )}
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default GlobalAlertDialog;
