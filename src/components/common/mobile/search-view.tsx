'use client';

import { useForm } from 'react-hook-form';

import { SearchSchemaType } from '@/components/navbar/search-bar';
import { Form } from '@/components/ui/form';
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { useModalWithBack } from '@/hooks/use-modal-with-back';
import { zodResolver } from '@hookform/resolvers/zod';
import { ChevronLeft, SearchLg } from '@untitled-ui/icons-react';
import { z } from 'zod';

import { MobileSearchInput } from './search-input';
import MobileSearchResult from './search-result';

const searchSchema = z.object({
  value: z.string({ required_error: '' }).min(1).max(50),
});
export function MobileSearchView() {
  const form = useForm<SearchSchemaType>({
    resolver: zodResolver(searchSchema),
    defaultValues: {
      value: '',
    },
  });

  const { open, setOpen } = useModalWithBack();

  const onClose = () => {
    setOpen(false);
  };

  return (
    <Sheet
      open={open}
      onOpenChange={setOpen}
    >
      <SheetTrigger asChild>
        <SearchLg />
      </SheetTrigger>
      <SheetContent
        side="bottom"
        className="h-dvh bg-white"
      >
        <SheetHeader className="hidden">
          <SheetTitle></SheetTitle>
          <SheetDescription></SheetDescription>
        </SheetHeader>
        <Form {...form}>
          <div className="flex items-center gap-x-2 w-full">
            <SheetClose asChild>
              <button>
                <ChevronLeft />
              </button>
            </SheetClose>
            <MobileSearchInput onClose={onClose} />
          </div>
          <MobileSearchResult onClose={onClose} />
        </Form>
      </SheetContent>
    </Sheet>
  );
}
