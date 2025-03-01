'use client';

import { useFormContext } from 'react-hook-form';

import CommonEditor from '@/components/common/editor/common-editor';
import HashtagInput from '@/components/common/hashtag-input';
import TextCounter from '@/components/common/text-counter';
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { COMMON_CATEGORIES } from '@/constants/common';
import { QnaWriteSchemaType } from '@/types/qna';

const QnaForm = () => {
  const {
    control,
    watch,
    formState: { defaultValues },
  } = useFormContext<QnaWriteSchemaType>();

  const tagLength = watch('tags').length;

  return (
    <div className="mt-[40px] space-y-[20px]">
      {/* 카테고리 선택 */}
      <FormField
        control={control}
        name="category"
        render={({ field, fieldState }) => {
          return (
            <FormItem className="flex items-start">
              <FormLabel className="w-[150px]">카테고리</FormLabel>
              <div className="w-full">
                <FormControl>
                  <Select
                    onValueChange={field.onChange}
                    value={field.value}
                  >
                    <FormControl>
                      <SelectTrigger error={!!fieldState.error}>
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

      {/* 해시태그 */}
      <FormField
        control={control}
        name="tags"
        render={({ field, fieldState }) => (
          <FormItem className="flex items-start">
            <FormLabel className="w-[150px]">해시태그</FormLabel>
            <div className="w-full">
              <FormControl>
                <HashtagInput
                  ref={field.ref}
                  hashtags={field.value}
                  onHashtagsChange={field.onChange}
                  error={!!fieldState.error}
                />
              </FormControl>

              <div className="flex justify-between mt-[10px]">
                <TextCounter
                  className="flex items-center typo-body-14-medium-100-tight "
                  count={tagLength}
                  limit={10}
                  variant="accent"
                />
              </div>
              <FormMessage className="text-left" />
            </div>
          </FormItem>
        )}
      />

      {/* 제목 */}
      <FormField
        control={control}
        name="title"
        render={({ field, fieldState }) => (
          <FormItem className="flex items-start">
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
                    toolbarClassName="sticky top-[96px]"
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

export default QnaForm;
