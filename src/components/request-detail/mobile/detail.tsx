'use client';

import { useParams } from 'next/navigation';

import { extensions } from '@/lib/tiptab/common-options';
import { cn } from '@/lib/utils';
import { useRequestDetailQuery } from '@/service/request/use-service';
import { COMMON_MARKDOWN_STYLE } from '@/styles/common';
import { EditorContent, useEditor } from '@tiptap/react';

const twStyles = {
  wrapper: `mt-[30px] mb-[50px] pc-screen:hidden`,
  title: `typo-title-18-bold-100`,
  desc: `typo-body-14-regular-150-tight`,
};

const RequestDetailMobileDetail = () => {
  const { id }: { id: string } = useParams();

  const { data } = useRequestDetailQuery(id);

  const editor = useEditor({
    content: data?.contents || '',
    shouldRerenderOnTransaction: false,
    immediatelyRender: false,
    editable: false,
    extensions: extensions,
  });

  return (
    <section className={twStyles.wrapper}>
      <div className={twStyles.title}>요청사항</div>
      <EditorContent
        editor={editor}
        className={cn(COMMON_MARKDOWN_STYLE)}
      />
    </section>
  );
};

export default RequestDetailMobileDetail;
