'use client';

import { useFormContext } from 'react-hook-form';

import { FILE_TYPES } from '@/constants/file-types';
import { useTermStore } from '@/store/work-new';
import { WorkNewSchemaType } from '@/types/work';
import { CheckVerified02, X } from '@untitled-ui/icons-react';

import { ActionTag } from '../ui/action-tag';
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../ui/form';
import { Input } from '../ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';
import { Separator } from '../ui/separator';
import { ToggleGroup, ToggleGroupItem } from '../ui/toggle-group';

const DetailInfoSection = () => {
  const { control, watch } = useFormContext<WorkNewSchemaType>();
  const { isTermAgreed } = useTermStore();

  const editCounts = Array.from({ length: 16 }).map((_, index) => ({
    value: String(index),
    label: `${index}회`,
  }));

  const editCountSelectValues = [
    ...editCounts,
    { label: '무제한', value: '-1' },
  ];
  const workDaysSelectValues = Array.from({ length: 90 }).map((_, index) => ({
    value: String(index + 1),
    label: `${index + 1}일`,
  }));

  return (
    <section className="space-y-[30px]">
      <h2 className="typo-title-20-bold-100-tight">상세 정보 설정</h2>
      <div className="flex flex-col gap-[30px]">
        <FormField
          control={control}
          name="fileTypes"
          render={({ field, fieldState }) => (
            <FormItem className="flex gap-[30px]">
              <FormLabel className="w-[100px] typo-body-14-medium-100-tight shrink-0">
                파일 제공 형태
              </FormLabel>
              <div className="flex flex-col w-full space-y-2.5">
                <DropdownMenu>
                  <FormControl ref={field.ref}>
                    <DropdownMenuTrigger asChild>
                      <Input
                        type="button"
                        className="text-slate-300 text-left cursor-pointer"
                        error={!!fieldState.error}
                        disabled={!isTermAgreed}
                        value="파일 제공 형태를 선택해주세요"
                      />
                    </DropdownMenuTrigger>
                  </FormControl>

                  <DropdownMenuContent className="w-[870px] h-[350px] overflow-scroll">
                    {FILE_TYPES.map(({ value, label }) => (
                      <DropdownMenuCheckboxItem
                        onCheckedChange={(checked) => {
                          let newValue: string[];

                          if (!field.value) {
                            newValue = [value];
                          } else if (checked) {
                            newValue = [...field.value, value];
                          } else {
                            newValue = field.value?.filter(
                              (fieldValue) => fieldValue !== value
                            );
                          }
                          field.onChange(newValue);
                        }}
                        checked={field.value?.includes(value)}
                        key={value}
                      >
                        {label}
                      </DropdownMenuCheckboxItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>

                <div className="border border-slate-200 rounded p-5 space-y-5">
                  <div className="text-slate-500 flex items-center gap-1.5">
                    <CheckVerified02 className="size-[20px]" />
                    <span className="typo-body-14-regular-150-tight">
                      많이 쓰이는 파일 형태 추천
                    </span>
                  </div>
                  <div className="flex gap-2.5">
                    {FILE_TYPES.slice(0, 7).map(({ label, value }) => {
                      const values = watch('fileTypes');
                      const selected = values?.includes(value);
                      return (
                        <ActionTag
                          onClick={() => {
                            let newValues: string[];
                            if (selected) return;

                            if (!values) {
                              newValues = [value];
                            } else {
                              newValues = [...values, value];
                            }
                            field.onChange(newValues);
                          }}
                          selected={selected}
                          key={value}
                          disabled={!isTermAgreed}
                        >
                          {label}
                        </ActionTag>
                      );
                    })}
                  </div>
                  {watch('fileTypes').length > 0 && (
                    <>
                      <Separator />
                      <div className="flex gap-[10px]">
                        {watch('fileTypes').map((fileType) => (
                          <ActionTag
                            outlined
                            key={fileType}
                            onClick={() => {
                              const filteredFileTypes = field.value.filter(
                                (value) => fileType !== value
                              );
                              field.onChange(filteredFileTypes);
                            }}
                          >
                            {fileType}
                            <X className="ml-[4px] size-[16px]" />
                          </ActionTag>
                        ))}
                      </div>
                    </>
                  )}
                </div>
                <FormMessage />
              </div>
            </FormItem>
          )}
        />
        <div className="flex justify-between gap-[30px]"></div>

        <FormField
          control={control}
          name="modifyCount"
          render={({ field, fieldState }) => (
            <FormItem className="flex gap-[30px]">
              <FormLabel className="w-[100px] typo-body-14-medium-100-tight shrink-0">
                수정 횟수
              </FormLabel>
              <div className="w-full">
                <Select
                  disabled={!isTermAgreed}
                  onValueChange={field.onChange}
                  value={field.value}
                >
                  <FormControl ref={field.ref}>
                    <SelectTrigger error={!!fieldState.error}>
                      <SelectValue />
                    </SelectTrigger>
                  </FormControl>

                  <SelectContent>
                    {editCountSelectValues.map(({ value, label }) => (
                      <SelectItem
                        key={value}
                        value={value}
                      >
                        {label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </div>
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="workDays"
          render={({ field, fieldState }) => (
            <FormItem className="flex gap-[30px]">
              <FormLabel className="w-[100px] typo-body-14-medium-100-tight shrink-0">
                작업 기간
              </FormLabel>

              <div className="w-full">
                <Select
                  disabled={!isTermAgreed}
                  onValueChange={field.onChange}
                  value={field.value}
                >
                  <FormControl ref={field.ref}>
                    <SelectTrigger error={!!fieldState.error}>
                      <SelectValue />
                    </SelectTrigger>
                  </FormControl>

                  <SelectContent>
                    {workDaysSelectValues.map(({ value, label }) => (
                      <SelectItem
                        key={value}
                        value={value}
                      >
                        {label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </div>
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="useRange"
          render={({ field }) => (
            <FormItem className="flex gap-[30px]">
              <FormLabel className="w-[100px] typo-body-14-medium-100-tight shrink-0">
                사용 범위
              </FormLabel>

              <div>
                <FormControl ref={field.ref}>
                  <ToggleGroup
                    disabled={!isTermAgreed}
                    onValueChange={field.onChange}
                    value={field.value}
                    type="multiple"
                    size="lg"
                    className="gap-[8px]"
                  >
                    <ToggleGroupItem
                      className="w-[130px]"
                      value="PROFIT"
                    >
                      상업용
                    </ToggleGroupItem>
                    <ToggleGroupItem
                      className="w-[130px]"
                      value="NON_PROFIT"
                    >
                      비상업용
                    </ToggleGroupItem>
                  </ToggleGroup>
                </FormControl>
                <FormMessage />
              </div>
            </FormItem>
          )}
        />
      </div>
    </section>
  );
};

export default DetailInfoSection;
