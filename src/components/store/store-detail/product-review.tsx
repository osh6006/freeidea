'use client';

import { useForm } from 'react-hook-form';
import { useInView } from 'react-intersection-observer';

import { useParams, useSearchParams } from 'next/navigation';

import CommonPagination from '@/components/common/common-pagination';
import Review from '@/components/common/review';
import { CommonAvatar } from '@/components/ui/avatar';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import Spinner from '@/components/ui/spinner';
import { Textarea } from '@/components/ui/textarea';
import { ELEMENT_ID } from '@/constants/element-id';
import { ERROR_MESSAGE } from '@/constants/message';
import useQueryString from '@/hooks/use-query-string';
import {
  CommentNewSchemaType,
  commentNewSchema,
} from '@/lib/zod/comment-new-schema';
import { useMyInfoQuery } from '@/service/auth/use-service';
import { useReportMutation } from '@/service/report/use-service';
import {
  useCreateStoreReviewMutation,
  useDeleteStoreReviewMutation,
  useStoreReviewListQuery,
} from '@/service/store/use-service';
import { useInViewStore } from '@/store/store/detail';
import { zodResolver } from '@hookform/resolvers/zod';

function ReviewWriteSeciton() {
  const methods = useForm<CommentNewSchemaType>({
    resolver: zodResolver(commentNewSchema),
    defaultValues: {
      comment: '',
    },
  });

  const { data: myInfo } = useMyInfoQuery();
  const { handleSubmit, control, resetField } = methods;
  const { id } = useParams<{ id: string }>();
  const { mutate: createReviewMutate } = useCreateStoreReviewMutation(id);

  const onValid = ({ comment }: { comment: string }) => {
    createReviewMutate(comment, {
      onSuccess: () => {
        resetField('comment');
      },
    });
  };

  return (
    <Form {...methods}>
      <form onSubmit={handleSubmit(onValid)}>
        <FormField
          control={control}
          name="comment"
          render={({ field, fieldState }) => (
            <FormItem>
              <div className="relative flex items-center gap-[10px] ">
                <FormLabel>
                  <CommonAvatar
                    nickname={myInfo?.nickname}
                    src={myInfo?.profileImageUrl}
                  />
                </FormLabel>

                <div className="flex-1">
                  <FormControl>
                    <Textarea
                      className="pr-[70px]"
                      {...field}
                      autoResize
                      rows={1}
                      error={!!fieldState.error}
                      submitOnEnter
                    />
                  </FormControl>

                  <button
                    className="absolute typo-body-14-bold-100-tight px-[10px] py-[4px] right-[18px] top-1/2 -translate-y-1/2"
                    type="submit"
                  >
                    입력
                  </button>
                  <FormMessage />
                </div>
              </div>
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
}

function ReviewListSection() {
  const { id } = useParams<{ id: string }>();
  const { searchParams, createQueryString } = useQueryString();
  const pageParam = searchParams.get('review-page');

  const { data } = useStoreReviewListQuery({
    productId: id,
    page: pageParam ? Number(pageParam) : undefined,
  });
  const { data: myInfo } = useMyInfoQuery();
  const { mutate: reportReviewMutate } = useReportMutation('storeReview');
  const { mutate: deleteReviewMutate } = useDeleteStoreReviewMutation();

  if (!data)
    throw new Error(
      ERROR_MESSAGE.unexpected('Check data initialization in server component.')
    );

  const { list, count, page } = data;

  return (
    <>
      {list.length === 0 ? (
        <div className="text-center py-[80px]">첫 댓글을 달아보세요.</div>
      ) : (
        <ul className="flex flex-col divide-y divide-border">
          {list.map(
            ({
              productCommentId,
              comment,
              profileImageUrl,
              nickname,
              createdAt,
              userId,
              studioId,
            }) => (
              <li key={productCommentId}>
                <Review
                  profileImageUrl={profileImageUrl}
                  nickname={nickname}
                  createdAt={createdAt}
                  content={comment}
                  studioId={studioId}
                  isMine={myInfo?.userId === userId}
                  onReportValidSubmit={({ title, contents }) => {
                    reportReviewMutate({
                      id: productCommentId,
                      body: { title, contents },
                    });
                  }}
                  onDeleteClick={() => {
                    deleteReviewMutate(productCommentId);
                  }}
                />
              </li>
            )
          )}
        </ul>
      )}

      {count > 10 && (
        <CommonPagination
          currentPage={page}
          totalItems={count}
          itemsPerPage={10}
          getHref={(page) => {
            const queryString = createQueryString('review-page', String(page));
            return `?${queryString}#${ELEMENT_ID.storeProductReview}`;
          }}
        />
      )}
    </>
  );
}

function ReviewSection() {
  const SCROLL_MARGIN = 100;

  const setInView = useInViewStore(
    ({ setIsReviewInView }) => setIsReviewInView
  );
  const { ref } = useInView({
    rootMargin: `-${SCROLL_MARGIN}px`,
    threshold: 0.1,
    onChange: (inView) => {
      setInView(inView);
    },
  });

  const searchParams = useSearchParams();
  const pageParam = searchParams.get('review-page');
  const { id } = useParams<{ id: string }>();

  const { data, isRefetching } = useStoreReviewListQuery({
    productId: id,
    page: pageParam ? Number(pageParam) : undefined,
  });

  if (!data) throw new Error(ERROR_MESSAGE.unexpected('review not found.'));

  const { count } = data;

  return (
    <>
      <div
        ref={ref}
        id={ELEMENT_ID.storeProductReview}
        style={{
          scrollMarginTop: SCROLL_MARGIN,
        }}
        className="flex flex-col gap-[20px]"
      >
        <div className="w-full flex items-center justify-between mt-[100px]">
          <span className="flex items-center gap-x-1 typo-title-20-bold-100-tight">
            댓글
            <strong className="text-primary">{count}</strong>
            {isRefetching && <Spinner className="size-[16px]" />}
          </span>
        </div>
        <ReviewWriteSeciton />
        <ReviewListSection />
      </div>
    </>
  );
}

export default ReviewSection;
