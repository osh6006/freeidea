'use client';

import { useInView } from 'react-intersection-observer';

import { useParams } from 'next/navigation';

import { ELEMENT_ID } from '@/constants/element-id';
import { extensions } from '@/lib/tiptab/common-options';
import { cn } from '@/lib/utils';
import { useStoreDetailQuery } from '@/service/store/use-service';
import { useInViewStore } from '@/store/store/detail';
import { COMMON_MARKDOWN_STYLE } from '@/styles/common';
import { EditorContent, useEditor } from '@tiptap/react';

const ProductDetailDesc = () => {
  const SCROLL_MARGIN = 100;
  const setInView = useInViewStore(({ setIsDescInView }) => setIsDescInView);
  const { id } = useParams<{ id: string }>();
  const { data } = useStoreDetailQuery(id);

  const editor = useEditor({
    content: data?.contents,
    shouldRerenderOnTransaction: false,
    immediatelyRender: false,
    editable: false,
    extensions: extensions,
  });

  const { ref } = useInView({
    rootMargin: `-${SCROLL_MARGIN}px`,
    threshold: 0.1,
    onChange: setInView,
  });

  if (!data) return;

  return (
    <div
      ref={ref}
      id={ELEMENT_ID.storeProductDesc}
    >
      <EditorContent
        editor={editor}
        className={cn(
          'flex flex-col w-full pt-[30px] scroll-mt-[100px]',
          COMMON_MARKDOWN_STYLE,
          'h-auto max-h-none min-h-none'
        )}
      />
    </div>
  );
};

export default ProductDetailDesc;
