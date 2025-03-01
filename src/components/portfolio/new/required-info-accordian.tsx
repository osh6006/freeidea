'use client';

import { useRef } from 'react';
import { useFormContext } from 'react-hook-form';

import TextCounter from '@/components/common/text-counter';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import Tag from '@/components/ui/tag';
import {
  Tooltip,
  TooltipContent,
  TooltipDescription,
  TooltipTitle,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { cn } from '@/lib/utils';
import { useGetChallengeList } from '@/service/portfolio/use-service';
import { useAccordionStore } from '@/store/portfolio/portfolio-new';
import { PortfolioNewSchemaType } from '@/types/portfolio';
import { Edit02, InfoCircle } from '@untitled-ui/icons-react';

import HashtagInput from '../../common/hashtag-input';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '../../ui/accordion';
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../../ui/form';
import { ToggleGroup, ToggleGroupItem } from '../../ui/toggle-group';

const toggleButtonClassName = 'w-[120px]';
const formItemClassName = 'flex gap-[50px]';

function ChallengeFormField() {
  const { control, watch, setValue, getValues } =
    useFormContext<PortfolioNewSchemaType>();
  const isChallengeApplied = watch('challenge.usage') === 'on';

  const { data: challengeList } = useGetChallengeList({
    enabled: isChallengeApplied,
  });

  const setChallengeMode = () => {
    const portfolioImages = getValues('portfolioImages');
    setValue(
      'portfolioImages',
      [portfolioImages.at(0)].filter((v) => v !== undefined)
    );
    setValue('showUsage', 'public');
  };

  return (
    <>
      <FormField
        control={control}
        name="challenge.usage"
        render={({ field }) => (
          <FormItem className={formItemClassName}>
            <FormLabel className="flex items-center gap-x-[6px] self-start">
              <span>도전작 지원</span>
              <Tooltip>
                <TooltipTrigger>
                  <InfoCircle className="size-[18px] text-slate-500" />
                </TooltipTrigger>
                <TooltipContent>
                  <TooltipTitle>도전작 지원</TooltipTitle>
                  <TooltipDescription>
                    다양한 경품이 쏟아지는 도전작에 작품을 올려보세요!
                    <br />
                    도전작, 개인 포트폴리오에 함께 업로드됩니다.
                  </TooltipDescription>
                </TooltipContent>
              </Tooltip>
            </FormLabel>
            <div className="flex flex-col items-start">
              <FormControl ref={field.ref}>
                <ToggleGroup
                  className="gap-[8px]"
                  type="single"
                  value={field.value}
                  onValueChange={(value) => {
                    field.onChange(value);
                    if (value === 'on') setChallengeMode();
                  }}
                >
                  <ToggleGroupItem
                    className={toggleButtonClassName}
                    value="on"
                  >
                    지원해요
                  </ToggleGroupItem>
                  <ToggleGroupItem
                    className={toggleButtonClassName}
                    value="off"
                  >
                    지원안해요
                  </ToggleGroupItem>
                </ToggleGroup>
              </FormControl>
              <FormMessage />
            </div>
          </FormItem>
        )}
      />

      {isChallengeApplied && challengeList && (
        <FormField
          control={control}
          name="challenge"
          render={({ field }) => (
            <FormItem className={formItemClassName}>
              <FormLabel className="invisible" />
              <Select
                value={field.value.id}
                onValueChange={(challengeId) => {
                  const selectedChallenge = challengeList?.find(
                    ({ challengeId: id }) => id === challengeId
                  );

                  if (!selectedChallenge)
                    throw new Error('챌린지를 찾을 수 없습니다.');
                  field.onChange({
                    usage: 'on',
                    id: selectedChallenge.challengeId,
                    number: selectedChallenge.challengeNumber,
                  });
                }}
              >
                <FormControl ref={field.ref}>
                  <SelectTrigger>
                    <SelectValue placeholder="지원할 내역을 선택해주세요." />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {challengeList.toReversed()?.map(({ challengeId, title }) => (
                    <SelectItem
                      key={challengeId}
                      value={challengeId}
                    >
                      <div className="flex items-center gap-[10px]">
                        <Tag
                          variant="blue"
                          size="sm"
                          rounded
                        >
                          도전작
                        </Tag>
                        <span>{title}</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
      )}
    </>
  );
}

function HashtagFormField() {
  const { control, watch } = useFormContext<PortfolioNewSchemaType>();
  const { usage, number } = watch('challenge');
  const isChallengeApplied = usage === 'on';
  const challengeTag =
    number && isChallengeApplied ? `${number}기 도전작` : undefined;

  return (
    <FormField
      control={control}
      name="tags"
      render={({ field }) => (
        <FormItem className={formItemClassName}>
          <FormLabel>해시태그</FormLabel>
          <div className="w-full">
            <FormControl>
              <HashtagInput
                ref={field.ref}
                fixedTags={challengeTag ? [challengeTag] : undefined}
                hashtags={field.value}
                onHashtagsChange={field.onChange}
              />
            </FormControl>
            <TextCounter
              className="mt-[10px]"
              variant="accent"
              count={field.value.length}
              limit={10}
            />
            <FormMessage />
          </div>
        </FormItem>
      )}
    />
  );
}

function ShowFormField() {
  const { control, watch } = useFormContext<PortfolioNewSchemaType>();

  return (
    <FormField
      control={control}
      name="showUsage"
      render={({ field }) => (
        <FormItem className={formItemClassName}>
          <FormLabel>공개</FormLabel>
          <div className="flex flex-col items-start">
            <FormControl ref={field.ref}>
              <ToggleGroup
                className="gap-[8px]"
                type="single"
                value={field.value}
                onValueChange={field.onChange}
              >
                <ToggleGroupItem
                  className={toggleButtonClassName}
                  value="public"
                >
                  공개
                </ToggleGroupItem>
                <ToggleGroupItem
                  disabled={watch('challenge.usage') === 'on'}
                  className={toggleButtonClassName}
                  value="private"
                >
                  비공개
                </ToggleGroupItem>
              </ToggleGroup>
            </FormControl>
            <FormMessage />
          </div>
        </FormItem>
      )}
    />
  );
}

function CommendUsedFormField() {
  const { control } = useFormContext<PortfolioNewSchemaType>();

  return (
    <FormField
      control={control}
      name="commentUsage"
      render={({ field }) => (
        <FormItem className={formItemClassName}>
          <FormLabel>댓글</FormLabel>
          <div className="flex flex-col items-start">
            <FormControl ref={field.ref}>
              <ToggleGroup
                className="gap-[8px]"
                type="single"
                value={field.value}
                onValueChange={field.onChange}
              >
                <ToggleGroupItem
                  className={toggleButtonClassName}
                  value="on"
                >
                  ON
                </ToggleGroupItem>
                <ToggleGroupItem
                  className={toggleButtonClassName}
                  value="off"
                >
                  OFF
                </ToggleGroupItem>
              </ToggleGroup>
            </FormControl>
            <FormMessage />
          </div>
        </FormItem>
      )}
    />
  );
}

function RequiredInfoAccordian() {
  const { expended, setExpended } = useAccordionStore();
  const {
    formState: { errors },
  } = useFormContext<PortfolioNewSchemaType>();

  const accordionRef = useRef<HTMLButtonElement>(null);
  const { tags, showUsage, commentUsage, challenge } = errors;

  const hasError = !!(tags || showUsage || commentUsage || challenge);

  return (
    <Accordion
      type="single"
      collapsible
      value={expended ? 'item' : ''}
      onValueChange={(value) => setExpended(value === 'item')}
    >
      <AccordionItem
        value="item"
        className={cn(hasError && 'border-error')}
      >
        <AccordionTrigger
          ref={accordionRef}
          className="px-[30px] py-[26px] content-center"
        >
          <div className="flex items-center ">
            <Edit02 className="size-[20px] mr-[6px]" />
            <span className="typo-body-16-bold-100-tight mr-[10px]">
              필수 정보 입력
            </span>
            <span className="typo-body-14-regular-150-tight text-slate-300">
              작품을 이해하기 위해 필요한 정보이니 꼼꼼하게 입력해주세요.
            </span>
          </div>
        </AccordionTrigger>
        <AccordionContent className="p-[30px] flex flex-col gap-[20px] [&_label]:w-[80px] [&_label]:shrink-0">
          <HashtagFormField />

          <ChallengeFormField />

          <ShowFormField />
          <CommendUsedFormField />
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}

export default RequiredInfoAccordian;
