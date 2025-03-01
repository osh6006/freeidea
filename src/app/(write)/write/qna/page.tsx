'use client';

import { DefaultValues } from 'react-hook-form';

import Heading from '@/components/common/heading';
import Footer from '@/components/home/footer';
import QnaEditorProvider from '@/components/lounge/qna/write/editor-provider';
import QnaForm from '@/components/lounge/qna/write/form';
import QnaFormProvider from '@/components/lounge/qna/write/form-provider';
import QnaFormWrapper from '@/components/lounge/qna/write/form-wrapper';
import NavbarWithButton from '@/components/navbar/navbar-with-button';
import { Button } from '@/components/ui/button';
import { FORM_ID } from '@/constants/form-id';
import { useQnaModifyQuery } from '@/service/qna/use-service';
import { QnaWriteSchemaType } from '@/types/qna';

export default function RequestWritePage({
  searchParams: { id },
}: {
  searchParams: {
    id?: string;
  };
}) {
  const mode = id ? 'update' : 'create';
  let defaultValues: DefaultValues<QnaWriteSchemaType> | undefined = undefined;

  const { data } = useQnaModifyQuery(id!);

  defaultValues = {
    title: data?.title || '',
    category: data?.category || '',
    contents: data?.contents || '',
    tags: data?.tags || [],
  };

  return (
    <>
      <NavbarWithButton
        button={
          <Button
            form={FORM_ID.qnaWrite}
            type="submit"
          >
            {id ? '질문 수정' : '질문 등록'}
          </Button>
        }
      />
      <QnaFormProvider defaultValues={defaultValues}>
        <QnaEditorProvider>
          <QnaFormWrapper mode={mode}>
            <main className="w-[1000px] mx-auto pb-[200px]">
              <Heading
                as="h1"
                className="typo-title-32-bold-150 mt-[50px]"
              >
                {id ? '질문 수정' : '질문 하기'}
              </Heading>
              <QnaForm />
            </main>
            <Footer />
          </QnaFormWrapper>
        </QnaEditorProvider>
      </QnaFormProvider>
    </>
  );
}
