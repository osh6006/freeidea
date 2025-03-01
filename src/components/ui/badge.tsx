import React from 'react';

import { cn } from '@/lib/utils';
import { type VariantProps, cva } from 'class-variance-authority';

const badgeVariants = cva(
  'inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
  {
    variants: {
      variant: {
        default:
          'border-transparent bg-primary text-primary-foreground hover:bg-primary/80',
        secondary:
          'border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80',
        destructive:
          'border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80',
        outline: 'text-foreground',
        card: 'py-1 px-2 bg-[#F1F1F1] text-[12px] text-[#A3A3A3] hover:bg-[#F1F1F1] font-[300] border-none',
        category:
          'inline-flex justify-center items-center gap-2.5 text-[#595959] bg-[#F1F1F1] text-center text-sm not-italic font-normal leading-[23px] tracking-[-0.35px] px-3 py-[5px] border-none rounded-[16.5px] ',
        searches:
          'inline-flex w-fit px-[12px] py-[5px] cursor-pointer  bg-[#FFFFFF] hover:bg-[#FFFFFF] text-[#595959] text-[14px] font-[400] whitespace-nowrap',
        basicRequest:
          'inline-flex w-fit h-[38px] px-[20px] rounded-[4px] border-[1px] border-[#DBDEE3] py-[12px] cursor-pointer  bg-[#FFFFFF] hover:bg-[#FFF5F8] text-[#BCC0C6] hover:text-[#E889A5] hover:border-[#FF96B5] text-[14px] font-[500] whitespace-nowrap',
        clickRequest:
          'inline-flex w-fit px-[20px] h-[38px] rounded-[4px] border-[1px] py-[12px] cursor-pointer bg-[#FFF5F8] text-[#E889A5] border-[#FF96B5] text-[14px] font-[500] whitespace-nowrap',
        openDeadline:
          'inline-flex w-fit h-[24px] px-[10px] rounded-[100px] py-[6px] cursor-pointer border-none bg-[#FF96B5] text-white text-[12px] font-[400] whitespace-nowrap',
        closedDeadline:
          'inline-flex w-fit h-[24px] px-[10px] rounded-[100px] py-[6px] cursor-pointer border-none bg-slate-tint-10 text-white text-slate-300 font-[400] whitespace-nowrap',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div
      className={cn(badgeVariants({ variant }), className)}
      {...props}
    />
  );
}

export { Badge, badgeVariants };
