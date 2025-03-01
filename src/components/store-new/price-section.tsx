'use client';

import { Fragment } from 'react';
import React from 'react';
import { useFieldArray, useFormContext } from 'react-hook-form';

import { WORK_NEW_DEFAULT_VALUES } from '@/constants/work-new/default-values';
import { useTermStore } from '@/store/work-new';
import { WorkNewSchemaType } from '@/types/work';
import { DragEndEvent } from '@dnd-kit/core';
import { verticalListSortingStrategy } from '@dnd-kit/sortable';
import {
  ChevronSelectorVertical,
  Plus,
  X,
  XCircle,
} from '@untitled-ui/icons-react';

import {
  SortableDndContext,
  SortableItem,
  SortableListner,
} from '../common/dnd';
import TextCounter from '../common/text-counter';
import { Button } from '../ui/button';
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../ui/form';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Separator } from '../ui/separator';

const OptionPriceInput = ({
  groupIndex,
  optionIndex,
  onRemoveClick,
}: {
  groupIndex: number;
  optionIndex: number;
  onRemoveClick: (targetIndex: number) => void;
}) => {
  const { isTermAgreed } = useTermStore();
  const { control } = useFormContext<WorkNewSchemaType>();

  return (
    <div className="flex gap-[20px] flex-1 items-center justify-between">
      <div className="flex gap-[10px] w-full justify-between">
        <FormField
          control={control}
          name={`optionGroups.${groupIndex}.options.${optionIndex}.optionName`}
          render={({ field, fieldState }) => (
            <FormItem className="w-full">
              <FormControl>
                <Input
                  placeholder="상세 옵션명을 입력해 주세요"
                  {...field}
                  disabled={!isTermAgreed}
                  error={!!fieldState.error}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name={`optionGroups.${groupIndex}.options.${optionIndex}.optionPrice`}
          render={({ field, fieldState }) => (
            <FormItem className="w-full">
              <FormControl>
                <div className="relative">
                  <Input
                    className="pr-[32px]"
                    type="text"
                    placeholder="1,000원 이상 설정해주세요"
                    inputMode="numeric"
                    {...field}
                    value={field.value ? field.value.toLocaleString() : ''}
                    onChange={(e) => {
                      const formattedValue = e.currentTarget.value;
                      const value = Number(formattedValue.replaceAll(',', ''));
                      if (isNaN(value)) return;
                      field.onChange(value);
                    }}
                    disabled={!isTermAgreed}
                    error={!!fieldState.error}
                  />
                  <span className="absolute top-1/2 right-[18px] -translate-y-1/2">
                    원
                  </span>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
      <button
        type="button"
        onClick={() => onRemoveClick(optionIndex)}
        disabled={!isTermAgreed}
      >
        <XCircle className="size-[20px] " />
      </button>
    </div>
  );
};

const OptionGroup = ({
  groupIndex,
  onRemoveClick,
}: {
  groupIndex: number;
  onRemoveClick: (targetIndex: number) => void;
}) => {
  const { control, setError } = useFormContext<WorkNewSchemaType>();
  const { isTermAgreed } = useTermStore();

  const {
    fields: optionsFields,
    move,
    append,
    remove,
  } = useFieldArray({
    control,
    name: `optionGroups.${groupIndex}.options`,
  });

  const { fields: optionGroupsFields, remove: removeOptionGroup } =
    useFieldArray({
      control,
      name: `optionGroups`,
    });

  const pushEmptyOption = () => {
    if (optionsFields.length >= 5) return;
    const emptyOption = WORK_NEW_DEFAULT_VALUES.optionGroups[0].options[0];
    emptyOption.optionId = crypto.randomUUID();
    append(emptyOption);
  };

  const removeOption = (targetIndex: number) => {
    if (optionsFields.length <= 1 && optionGroupsFields.length <= 1) {
      setError(`optionGroups.${groupIndex}.options`, {
        message: '옵션은 필수로 1개를 작성해야합니다.',
      });
      return;
    }

    if (optionsFields.length === 1) {
      removeOptionGroup(groupIndex);
      return;
    }

    remove(targetIndex);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over) return;
    if (active.id === over.id) {
      return;
    }
    const oldIndex = optionsFields.findIndex(({ id }) => id === active.id);
    const newIndex = optionsFields.findIndex(({ id }) => id === over.id);
    move(oldIndex, newIndex);
  };

  return (
    <>
      <div className="flex gap-[30px]">
        <FormField
          control={control}
          name={`optionGroups.${groupIndex}.optionGroupName`}
          render={({ field, fieldState }) => (
            <FormItem className="flex gap-[30px] w-full  pr-[10px]">
              <FormLabel className="w-[100px] typo-body-14-medium-100-tight shrink-0">
                옵션 그룹명
              </FormLabel>
              <div className="w-full">
                <div className="flex gap-[20px] items-center">
                  <div className="relative flex-1">
                    <FormControl>
                      <Input
                        placeholder="옵션 그룹명을 설정해주세요"
                        {...field}
                        disabled={!isTermAgreed}
                        error={!!fieldState.error}
                      />
                    </FormControl>
                    <TextCounter
                      className="absolute bottom-1/2 translate-y-1/2 right-[18px] w-fit"
                      count={field.value.length}
                      limit={30}
                    />
                  </div>

                  <button
                    type="button"
                    onClick={() => onRemoveClick(groupIndex)}
                  >
                    <X className="size-[20px]" />
                  </button>
                </div>

                <FormMessage />
              </div>
            </FormItem>
          )}
        />
      </div>
      <div className="flex gap-[30px]">
        <Label className="w-[100px] typo-body-14-medium-100-tight shrink-0">
          옵션 값
        </Label>
        <div className="w-full">
          <div className="flex flex-col w-full gap-[20px]">
            <SortableDndContext
              items={optionsFields.map(({ id }) => id)}
              strategy={verticalListSortingStrategy}
              onDragEnd={handleDragEnd}
            >
              {optionsFields.map(({ id }, optionIndex) => (
                <SortableItem
                  key={id}
                  id={id}
                  className="flex gap-[20px] items-center"
                >
                  <SortableListner>
                    <ChevronSelectorVertical className="size-[20px] text-slate-500" />
                  </SortableListner>
                  <OptionPriceInput
                    onRemoveClick={removeOption}
                    groupIndex={groupIndex}
                    optionIndex={optionIndex}
                  />
                </SortableItem>
              ))}
            </SortableDndContext>
          </div>
          <FormField
            control={control}
            name={`optionGroups.${groupIndex}.options`}
            render={() => (
              <FormItem>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      </div>

      <Button
        type="button"
        variant="secondary"
        size="lg"
        className="w-full"
        onClick={pushEmptyOption}
        disabled={!isTermAgreed || optionsFields.length >= 5}
      >
        상세 옵션 추가하기
      </Button>
    </>
  );
};

const PriceSection = () => {
  const { control, setError } = useFormContext<WorkNewSchemaType>();
  const {
    fields: optionGroupsFields,
    append,
    remove,
  } = useFieldArray({
    control,
    name: 'optionGroups',
  });
  const { isTermAgreed } = useTermStore();

  const pushEmptyOptionGroup = () => {
    if (optionGroupsFields.length >= 5) return;
    const emptyOptionGroup = {
      optionGroupId: crypto.randomUUID(),
      optionGroupName: '',
      options: [
        {
          optionId: crypto.randomUUID(),
          optionName: '',
          optionPrice: 0,
        },
      ],
    };
    append(emptyOptionGroup);
  };

  const removeOptionGroup = (targetIndex: number) => {
    if (optionGroupsFields.length <= 1) {
      setError(`optionGroups.${0}.optionGroupName`, {
        message: '옵션은 필수로 1개를 작성해야합니다.',
      });
      return;
    }
    remove(targetIndex);
  };

  return (
    <section className="space-y-[30px]">
      <div className="flex gap-[30px] justify-between">
        <div className="space-y-[10px]">
          <h2 className="typo-title-20-bold-100-tight">작품 금액 설정</h2>
        </div>
        <button
          type="button"
          onClick={pushEmptyOptionGroup}
          className="flex h-fit text-pink-500 items-center gap-[6px] shrink-0 typo-body-14-medium-100-tight disabled:text-slate-200"
          disabled={!isTermAgreed || optionGroupsFields.length >= 5}
        >
          <Plus className="size-[20px]" />
          <span>옵션 추가하기</span>
        </button>
      </div>
      {optionGroupsFields.map((optionGroup, index) => {
        const length = optionGroupsFields.length;
        const hasSeparator = length > 1 && index < length - 1;
        return (
          <Fragment key={optionGroup.id}>
            <OptionGroup
              groupIndex={index}
              onRemoveClick={removeOptionGroup}
            />
            {hasSeparator && <Separator />}
          </Fragment>
        );
      })}
    </section>
  );
};

export default PriceSection;
