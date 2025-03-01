import {
  ButtonHTMLAttributes,
  DetailedHTMLProps,
  HTMLAttributes,
  PropsWithChildren,
} from 'react';

import { cn } from '@/lib/utils';
import { Check, Hash02 } from '@untitled-ui/icons-react';

interface HashActionTagProps {
  hashtag?: boolean;
  className?: string;
}

export const HashActionTag = ({
  children,
  className,
  hashtag = true,
}: PropsWithChildren<HashActionTagProps>) => {
  return (
    <div
      className={cn(
        'px-[6px] py-[4px] bg-slate-50 rounded-[2px] flex items-center typo-body-14-regular-150-tight h-[26px]',
        className
      )}
    >
      {hashtag && <Hash02 className="mr-[2px] size-[10px]" />}
      {children}
    </div>
  );
};

interface ActionTagProps
  extends DetailedHTMLProps<
    ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  selected?: boolean;
  outlined?: boolean;
}

export const ActionTag = ({
  className,
  children,
  selected = false,
  outlined = false,
  ...props
}: ActionTagProps) => {
  return (
    <button
      type="button"
      className={cn(
        'flex items-center justify-center gap-[4px] text-pink-300 px-2.5 py-1.5 bg-pink-tint-10 rounded-full typo-body-14-medium-100-tight disabled:cursor-not-allowed disabled:bg-slate-tint-5',
        selected
          ? 'text-white bg-pink-500'
          : 'hover:text-pink-300 hover:bg-pink-tint-15',
        outlined && 'border border-pink-300',
        className
      )}
      {...props}
    >
      {children}
      {selected && <Check className="size-[10px]" />}
    </button>
  );
};
