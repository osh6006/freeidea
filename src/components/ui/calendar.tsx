'use client';

import * as React from 'react';
import { DayPicker } from 'react-day-picker';

import { ChevronLeft, ChevronRight } from 'lucide-react';

import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export type CalendarProps = React.ComponentProps<typeof DayPicker>;

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  ...props
}: CalendarProps) {
  return (
    <DayPicker
      className={cn('p-3', className)}
      classNames={{
        months:
          'flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0 ',
        month: 'space-y-4 ',
        caption: 'flex justify-center pt-1 relative items-center ',
        caption_label: 'text-[16px]',
        nav: 'space-x-1 flex items-center',
        nav_button: cn(
          buttonVariants({ variant: 'outline' }),
          'h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100'
        ),
        nav_button_previous: 'absolute left-1',
        nav_button_next: 'absolute right-1',
        table: 'w-full border-collapse space-y-1 ',
        head_row: 'flex ',
        head_cell:
          'text-slate-500 rounded-md w-[40px] font-normal text-[0.8rem] ',
        row: 'flex w-full mt-2 ',
        cell: 'h-[40px] w-[40px] flex items-center justify-center text-center overflow-hidden text-[14px] p-0 relative [&:has([aria-selected].day-range-end)]:rounded-r-md [&:has([aria-selected].day-outside)]:bg-accent/50 [&:has([aria-selected])]:bg-accent [&:has([aria-selected])]:rounded-full first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-full focus-within:relative focus-within:z-20 hover:bg-slate-50 rounded-full',
        day: cn(
          'h-[40px] w-[40px] p-0 font-normal aria-selected:opacity-100 rounded-full'
        ),
        day_range_end: 'day-range-end ',
        day_selected:
          'bg-slate-800 text-white focus:bg-slate-800 focus:text-white',
        day_today:
          'relative after:content-[""] after:w-[4px] after:h-[4px] after:absolute after:bottom-[6px] after:left-1/2 after:-translate-x-1/2 after:bg-slate-800 after:rounded-full after:text-gray-500',
        day_outside:
          'day-outside text-muted-foreground opacity-50 aria-selected:bg-accent/50 aria-selected:text-muted-foreground aria-selected:opacity-30 ',
        day_disabled: 'text-muted-foreground opacity-50 ',
        day_range_middle:
          'aria-selected:bg-accent aria-selected:text-accent-foreground ',
        day_hidden: 'invisible',

        ...classNames,
      }}
      components={{
        IconLeft: ({ ...props }) => <ChevronLeft className="h-4 w-4" />,
        IconRight: ({ ...props }) => <ChevronRight className="h-4 w-4" />,
      }}
      {...props}
    />
  );
}
Calendar.displayName = 'Calendar';

export { Calendar };
