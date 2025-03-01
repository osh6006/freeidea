'use client';

import Link from 'next/link';

import { ELEMENT_ID } from '@/constants/element-id';
import { cn } from '@/lib/utils';
import { useInViewStore } from '@/store/store/detail';

const WrapperStyle = 'py-2 border-b-2 border-transparent';
const DefaultStyle = 'text-slate-400';
const ActiveStyle = 'text-slate-800 border-slate-800';

const ProductDetailTabs = () => {
  const { isDescInView, isReviewInView } = useInViewStore();

  const activeTab = isDescInView
    ? 'product_desc'
    : isReviewInView
      ? 'product_review'
      : 'product_desc';

  return (
    <nav className="sticky top-[50px] z-10 flex items-center gap-x-[20px] border-b border-slate-200 typo-body-16-bold-100-tight bg-white  mt-[40px]">
      <Link
        replace
        href={`#${ELEMENT_ID.storeProductDesc}`}
      >
        <div
          className={cn(
            WrapperStyle,
            activeTab === ELEMENT_ID.storeProductDesc
              ? ActiveStyle
              : DefaultStyle
          )}
        >
          작품설명
        </div>
      </Link>
      <Link
        replace
        href={`#${ELEMENT_ID.storeProductReview}`}
      >
        <div
          className={cn(
            WrapperStyle,
            activeTab === 'product_review' ? ActiveStyle : DefaultStyle
          )}
        >
          댓글
        </div>
      </Link>
    </nav>
  );
};

export default ProductDetailTabs;
