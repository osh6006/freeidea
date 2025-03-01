'use client';

import { useFormContext } from 'react-hook-form';

import TextCounter from '@/components/common/text-counter';
import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';
import { COMMON_MARKDOWN_STYLE } from '@/styles/common';
import { PortfolioNewSchemaType } from '@/types/portfolio';
import { EditorContent } from '@tiptap/react';

import { useEditorContext } from '../../common/editor/editor-provider';

function ContentSection() {
  const editor = useEditorContext();
  const { control } = useFormContext<PortfolioNewSchemaType>();

  return (
    <>
      <FormField
        control={control}
        name="title"
        render={({ field, fieldState }) => (
          <FormItem className="group flex flex-col gap-[10px]">
            <FormControl className="relative">
              <div>
                <Input
                  {...field}
                  maxLength={20}
                  className="border-none px-0 typo-title-32-bold-150 focus:ring-0 pr-[60px]"
                  placeholder="제목을 입력해주세요."
                />
                <TextCounter
                  className="absolute bottom-0 right-0"
                  variant="accent"
                  limit={20}
                  count={field.value.length}
                />
              </div>
            </FormControl>

            <Separator
              className={cn(
                'group-focus-within:bg-slate-800',
                fieldState.error && 'bg-error group-focus-within:bg-error'
              )}
            />

            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={control}
        name="contents"
        render={({ field }) => {
          return (
            <FormItem className="relative">
              <FormControl ref={field.ref}>
                <EditorContent
                  editor={editor}
                  className={cn(COMMON_MARKDOWN_STYLE, 'min-h-min')}
                />
              </FormControl>
              <FormMessage />
              {editor?.isEmpty && ( // 라이브러리 문제로 placeholder 임시처리입니다.
                <span className="absolute top-0 left-0 text-slate-300">
                  내용을 입력해주세요.
                </span>
              )}
            </FormItem>
          );
        }}
      />
    </>
  );
}

export default ContentSection;
