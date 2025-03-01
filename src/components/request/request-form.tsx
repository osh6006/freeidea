'use client';

import React, { useState } from 'react';
import { useFormContext } from 'react-hook-form';

import { ChevronDown } from 'lucide-react';

import CommonEditor from '@/components/common/editor/common-editor';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Checkbox } from '@/components/ui/checkbox';
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { COMMON_CATEGORIES } from '@/constants/common';
import { USE_RANGE_BOX_ITEMS } from '@/constants/request/request';
import { cn, formatCurrency } from '@/lib/utils';
import { RequestSchemaType } from '@/types/request';
import { addDays, format } from 'date-fns';
import { ko } from 'date-fns/locale';

import { RadioGroup, RequestRadioGroupItem } from '../ui/radio-group';

const RequestForm = () => {
  const [isCalendarOpen, setCalendarOpen] = useState(false);

  const {
    control,
    watch,
    setValue,
    clearErrors,
    formState: { defaultValues },
  } = useFormContext<RequestSchemaType>();

  const isDiscussion = watch('isDiscussionPossible');

  return (
    <div className="mt-6 space-y-6 pc-screen:mt-10 pc-screen:space-y-5">
      {/* 카테고리 선택 */}
      <FormField
        control={control}
        name="category"
        render={({ field, fieldState }) => {
          return (
            <FormItem className="flex flex-col items-start gap-y-2 pc-screen:flex-row">
              <FormLabel className="w-[150px]">카테고리</FormLabel>
              <div className="w-full">
                <FormControl>
                  <Select
                    onValueChange={field.onChange}
                    value={field.value}
                  >
                    <FormControl>
                      <SelectTrigger
                        className={cn(
                          fieldState.error ? 'bg-pink-50 border-error' : ''
                        )}
                      >
                        <SelectValue placeholder="의뢰할 카테고리를 선택하세요" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent className="">
                      {COMMON_CATEGORIES.map((category) => (
                        <SelectItem
                          key={category.value}
                          value={category.value}
                        >
                          {category.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </div>
            </FormItem>
          );
        }}
      />

      {/* 예산 */}
      <FormField
        control={control}
        name="budget"
        render={({ field, fieldState }) => {
          return (
            <FormItem className="flex flex-col items-start gap-y-2 pc-screen:flex-row">
              <FormLabel className="w-[150px]">예산</FormLabel>
              <div className="w-full">
                <FormControl>
                  <div className="relative w-full">
                    <div
                      className={cn(
                        'absolute left-[10px] top-1/2 -translate-y-1/2 text-[14px] font-semibold leading-[14px] tracking-[-2%]',
                        isDiscussion ? 'text-primary' : ''
                      )}
                    >
                      {isDiscussion ? '₩ 금액 협의 가능' : '₩'}
                    </div>
                    <Input
                      error={!!fieldState.error}
                      placeholder={isDiscussion ? '' : '예) 5,000'}
                      {...field}
                      value={isDiscussion ? '' : formatCurrency(field.value)}
                      onChange={(e) => {
                        return field.onChange(e.target.value.replace(/,/g, ''));
                      }}
                      className="pl-[30px] disabled:bg-transparent"
                      style={{
                        border: '1px solid #dbdee3',
                      }}
                      maxLength={11}
                      disabled={isDiscussion}
                    />
                    <div className="absolute flex gap-x-[6px] items-center  right-[18px] top-1/2 -translate-y-1/2 text-[14px] font-semibold leading-[14px] tracking-[-2%]">
                      <Checkbox
                        id="isDisscussion"
                        onCheckedChange={(e) => {
                          setValue('isDiscussionPossible', e as boolean);
                          setValue('budget', undefined);
                          clearErrors('budget');
                        }}
                        className={cn(
                          isDiscussion ? 'border-primary' : 'border-slate-300'
                        )}
                      />
                      <label
                        htmlFor="isDisscussion"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        금액 협의 가능
                      </label>
                    </div>
                  </div>
                </FormControl>
                <FormMessage />
              </div>
            </FormItem>
          );
        }}
      />

      {/* 마감기한 */}
      <FormField
        control={control}
        name="dueDate"
        render={({ field, fieldState }) => (
          <FormItem className="flex flex-col items-start gap-y-2 pc-screen:flex-row">
            <FormLabel className="w-[150px]">마감 기한</FormLabel>
            <div className="w-full">
              <Popover
                open={isCalendarOpen}
                onOpenChange={(open) => setCalendarOpen(open)}
              >
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={'outline'}
                      className={cn(
                        'calendar-button w-full px-[10px] h-[48px] text-left font-normal text-slate-800 rounded-[4px] focus:ring-[2px] focus:ring-slate-800 bg-white hover:bg-slate-50 ',
                        isCalendarOpen && 'ring-slate-800 ring-[2px]',
                        fieldState.error ? 'bg-pink-50 border-error' : ''
                      )}
                    >
                      {field.value ? (
                        format(field?.value, 'yy.MM.dd')
                      ) : (
                        <span className="text-slate-300 typo-body-14-regular-150-tight">
                          마감 기한을 선택해 주세요
                        </span>
                      )}
                      <ChevronDown className="h-5 w-5 text-slate-800 ml-auto" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className=" w-[--radix-popover-trigger-width] max-h-[--radix-popover-content-available-height]">
                  <Calendar
                    mode="single"
                    className="w-fit mx-auto"
                    numberOfMonths={2}
                    selected={field.value}
                    onSelect={field.onChange}
                    fromDate={addDays(new Date(), 1)}
                    initialFocus
                    locale={ko}
                  />
                </PopoverContent>
              </Popover>
              <FormMessage />
            </div>
          </FormItem>
        )}
      />

      {/* 사용 범위 */}
      <FormField
        control={control}
        name="useRange"
        render={() => (
          <FormItem className="flex flex-col items-start gap-y-2 pc-screen:flex-row">
            <FormLabel className="w-[150px]">사용 범위</FormLabel>
            <div className="w-full flex flex-col">
              <div className="flex w-full gap-x-2">
                <FormField
                  control={control}
                  name="useRange"
                  render={({ field }) => {
                    return (
                      <FormItem className="flex w-full flex-row items-start space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroup
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                            className="flex w-full"
                          >
                            {USE_RANGE_BOX_ITEMS.map((item) => (
                              <FormItem
                                key={item.id}
                                className="flex flex-1 items-center space-x-3 space-y-0 pc-screen:flex-initial"
                              >
                                <FormControl>
                                  <RequestRadioGroupItem
                                    value={item.id}
                                    className="w-full pc-screen:w-[250px]"
                                  >
                                    <FormLabel className="font-normal">
                                      {item.label}
                                    </FormLabel>
                                  </RequestRadioGroupItem>
                                </FormControl>
                              </FormItem>
                            ))}
                          </RadioGroup>
                        </FormControl>
                      </FormItem>
                    );
                  }}
                />
              </div>
              <FormMessage />
            </div>
          </FormItem>
        )}
      />

      {/* 사용 목적 */}
      <FormField
        control={control}
        name="usePurpose"
        render={({ field, fieldState }) => (
          <FormItem className="flex flex-col items-start gap-y-2 pc-screen:flex-row">
            <FormLabel className="w-[150px]">사용목적</FormLabel>
            <div className="w-full flex flex-col">
              <FormControl>
                <div className="relative w-full">
                  <Input
                    error={!!fieldState.error}
                    placeholder="사용 목적을 입력해 주세요"
                    {...field}
                  />
                </div>
              </FormControl>
              <FormMessage />
            </div>
          </FormItem>
        )}
      />

      {/* 제목 */}
      <FormField
        control={control}
        name="title"
        render={({ field, fieldState }) => (
          <FormItem className="flex flex-col items-start gap-y-2 pc-screen:flex-row">
            <FormLabel className="w-[150px]">제목</FormLabel>
            <div className="w-full flex flex-col">
              <FormControl>
                <div className="relative w-full">
                  <Input
                    error={!!fieldState.error}
                    placeholder="제목을 입력해 주세요"
                    {...field}
                  />
                </div>
              </FormControl>
              <FormMessage />
            </div>
          </FormItem>
        )}
      />

      {/* 내용 */}
      <FormField
        control={control}
        name="contents"
        render={({ field, fieldState }) => {
          return (
            <FormItem className="flex flex-col items-start">
              <FormLabel className="w-[150px] mb-[20px]">내용</FormLabel>
              <div className="w-full flex flex-col">
                <FormControl className="w-full">
                  <CommonEditor
                    content={field.value}
                    onChange={field.onChange}
                    error={!!fieldState.error}
                    isDirty={fieldState.isDirty}
                    initialContent={defaultValues?.contents}
                    toolbarClassName="sticky overflow-auto pc-screen:top-[96px]"
                    contentsClassName="min-h-[492px]"
                  />
                </FormControl>
                <FormMessage />
              </div>
            </FormItem>
          );
        }}
      />
    </div>
  );
};

export default RequestForm;
