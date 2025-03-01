'use client';

import { useFormContext } from 'react-hook-form';

import { COMMON_CATEGORIES } from '@/constants/common';
import { cn } from '@/lib/utils';
import { useTermStore } from '@/store/work-new';
import { LABEL_CLASS_NAME } from '@/styles/work-new';
import { WorkNewSchemaType } from '@/types/work';
import { InfoCircle } from '@untitled-ui/icons-react';

import HashtagInput from '../common/hashtag-input';
import TextCounter from '../common/text-counter';
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';
import {
  Tooltip,
  TooltipContent,
  TooltipDescription,
  TooltipTitle,
  TooltipTrigger,
} from '../ui/tooltip';

const CategorySection = () => {
  const { control } = useFormContext<WorkNewSchemaType>();

  const { isTermAgreed } = useTermStore();

  return (
    <section className="space-y-[30px]">
      <h2 className="typo-title-20-bold-100-tight">작품 카테고리 설정</h2>

      <FormField
        control={control}
        name="category"
        render={({ field, fieldState }) => (
          <FormItem className="flex justify-between gap-[30px]">
            <FormLabel className={LABEL_CLASS_NAME}>카테고리</FormLabel>
            <div className="w-full">
              <Select
                onValueChange={field.onChange}
                defaultValue={field.value}
                disabled={!isTermAgreed}
              >
                <FormControl ref={field.ref}>
                  <SelectTrigger error={!!fieldState.error}>
                    <SelectValue placeholder="의뢰할 카테고리를 선택해주세요" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {COMMON_CATEGORIES.map(({ label, value }) => (
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
        name="tags"
        render={({ field, fieldState }) => (
          <FormItem className="flex gap-[30px]">
            <FormLabel
              className={cn(LABEL_CLASS_NAME, 'flex gap-[4px] items-start')}
            >
              <span># 해시태그</span>
              <Tooltip>
                <TooltipTrigger>
                  <InfoCircle className="size-[16px]" />
                </TooltipTrigger>
                <TooltipContent className="max-w-[320px]">
                  <TooltipTitle>
                    작품을 가장 잘 표현할 수 있는 태그를 입력해보세요.
                  </TooltipTitle>
                  <TooltipDescription>
                    작품의 특징, 연상되는 단어, 또는 주요 타깃을 고려한
                    <br />
                    태그가 좋아요. 단, 상표권을 취득한 타인의 상표를
                    <br />
                    무단으로 사용할 경우 사전 안내 없이 삭제될 수 있어요.
                  </TooltipDescription>
                </TooltipContent>
              </Tooltip>
            </FormLabel>

            <div className="flex flex-col w-full gap-[10px]">
              <FormControl
                ref={field.ref}
                className="focus:bg-black"
              >
                <HashtagInput
                  error={!!fieldState.error}
                  hashtags={field.value}
                  onHashtagsChange={field.onChange}
                  disabled={!isTermAgreed}
                />
              </FormControl>

              <TextCounter
                count={field.value.length}
                variant="accent"
                limit={10}
              />
              <FormMessage className="m-0" />
            </div>
          </FormItem>
        )}
      />
    </section>
  );
};

export default CategorySection;
