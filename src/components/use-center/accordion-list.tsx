import * as React from 'react';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { cn } from '@/lib/utils';

interface IUseCenterAccordionListProps {
  accordionList: {
    id: string;
    title: string;
    contents: string;
  }[];
  className?: string;
}

const UseCenterAccordionList: React.FunctionComponent<
  IUseCenterAccordionListProps
> = ({ accordionList, className }) => {
  return (
    <section className={cn('', className)}>
      <Accordion
        type="single"
        collapsible
        className="w-full"
      >
        {accordionList.map((accordion) => (
          <AccordionItem
            key={accordion.id}
            value={accordion.id}
            className=""
          >
            <AccordionTrigger className="text-base leading-[150%] text-slate-600 hover:no-underline py-[21px] px-[10px] ">
              {accordion.title}
            </AccordionTrigger>
            <AccordionContent className="text-base px-[30px] pt-[20px] pb-[40px] bg-slate-50 text-slate-500 leading-[150%]">
              {accordion.contents}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  );
};

export default UseCenterAccordionList;
