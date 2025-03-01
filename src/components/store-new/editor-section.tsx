'use client';

import { useFormContext } from 'react-hook-form';

import { useTermStore } from '@/store/work-new';
import { WorkNewSchemaType } from '@/types/work';

import CommonEditor from '../common/editor/common-editor';
import { FormControl, FormField, FormItem, FormMessage } from '../ui/form';

const EditorSection = () => {
  const {
    control,
    formState: { defaultValues },
  } = useFormContext<WorkNewSchemaType>();
  const { isTermAgreed } = useTermStore();

  return (
    <section className="space-y-[30px]">
      <h2 className="typo-title-20-bold-100-tight">작품 설명</h2>
      <FormField
        control={control}
        name="contents"
        render={({ field, fieldState }) => {
          return (
            <FormItem className="relative">
              <FormControl>
                <CommonEditor
                  toolbarClassName="sticky top-[96px]"
                  contentsClassName="min-h-[492px]"
                  error={!!fieldState.error}
                  onChange={field.onChange}
                  disabled={!isTermAgreed}
                  content={field.value}
                  initialContent={defaultValues?.contents || ''}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          );
        }}
      />
    </section>
  );
};

export default EditorSection;
