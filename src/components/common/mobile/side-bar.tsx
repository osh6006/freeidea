'use client';

import Link from 'next/link';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Separator } from '@/components/ui/separator';
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import {
  BASIC_MOBILE_PATHS,
  EXTERNAL_PATH,
  LOGGEDIN_MOBILE_PATHS,
} from '@/constants/path';
import { useModalWithBack } from '@/hooks/use-modal-with-back';
import { useLogoutMutation, useMyInfoQuery } from '@/service/auth/use-service';
import { Menu01 } from '@untitled-ui/icons-react';

import MobileSidebarHeader from './side-bar-header';

const ACCORDIAN_twStyles = {
  base: 'gap-x-2',
  item: 'border-none p-0',
  trigger:
    'typo-body-16-bold-100-tight px-3 py-2 [&[data-state=open]]:bg-slate-50 transition-colors rounded',
  content: 'py-2 flex flex-col typo-body-14-regular-150-tight',
  subMenu: 'px-8 py-2',
  active: '',
};

const MobileSidebar = () => {
  const { data: myInfo } = useMyInfoQuery();
  const { mutate: logoutMutate } = useLogoutMutation();

  const { open, setOpen } = useModalWithBack();

  return (
    <Sheet
      open={open}
      onOpenChange={setOpen}
    >
      <SheetTrigger asChild>
        <button>
          <Menu01 />
        </button>
      </SheetTrigger>
      <SheetContent
        side="left"
        className="w-dvw bg-white overflow-y-auto max-h-dvh p-0"
        isClose
      >
        <SheetHeader className="flex mt-5 py-5 sticky px-5">
          <MobileSidebarHeader setOpen={setOpen} />
          <SheetTitle className="hidden"></SheetTitle>
          <SheetDescription className="hidden"></SheetDescription>
        </SheetHeader>
        <Separator className="h-2 bg-slate-50" />
        <nav className="grid gap-4 py-4 px-5">
          <Accordion
            className="w-full space-y-2 "
            type="multiple"
            defaultValue={['item-1']}
          >
            {myInfo
              ? LOGGEDIN_MOBILE_PATHS.map((info, i) => {
                  return (
                    <AccordionItem
                      value={`item-${i + 1}`}
                      key={info.label}
                      className={ACCORDIAN_twStyles.item}
                    >
                      <AccordionTrigger className={ACCORDIAN_twStyles.trigger}>
                        {info.label}
                      </AccordionTrigger>
                      <AccordionContent className={ACCORDIAN_twStyles.content}>
                        {info.subMenu.map((sub) => (
                          <SheetClose
                            asChild
                            key={sub.label}
                          >
                            <Link
                              href={sub.path}
                              key={sub.label}
                              className={ACCORDIAN_twStyles.subMenu}
                            >
                              {sub.label}
                            </Link>
                          </SheetClose>
                        ))}
                      </AccordionContent>
                    </AccordionItem>
                  );
                })
              : BASIC_MOBILE_PATHS.map((info, i) => {
                  return (
                    <AccordionItem
                      value={`item-${i + 1}`}
                      key={info.label}
                      className={ACCORDIAN_twStyles.item}
                    >
                      <AccordionTrigger className={ACCORDIAN_twStyles.trigger}>
                        {info.label}
                      </AccordionTrigger>
                      <AccordionContent className={ACCORDIAN_twStyles.content}>
                        {info.subMenu.map((sub) => (
                          <SheetClose
                            asChild
                            key={sub.label}
                          >
                            <Link
                              href={sub.path}
                              key={sub.label}
                              className={ACCORDIAN_twStyles.subMenu}
                            >
                              {sub.label}
                            </Link>
                          </SheetClose>
                        ))}
                      </AccordionContent>
                    </AccordionItem>
                  );
                })}
          </Accordion>
        </nav>
        <SheetFooter className="border-t mx-5">
          <Link
            href={EXTERNAL_PATH.supportCetner}
            className="typo-body-14-regular-150-tight mt-4 px-3"
          >
            이용센터
          </Link>
        </SheetFooter>
        {myInfo && (
          <div className="flex items-center justify-center border-t typo-body-14-regular-150-tight mt-4 mx-5">
            <SheetClose asChild>
              <button
                onClick={() => {
                  logoutMutate();
                }}
                className="py-[9px] font-medium typo-body-14-regular-150-tight "
              >
                로그아웃
              </button>
            </SheetClose>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
};

export default MobileSidebar;
