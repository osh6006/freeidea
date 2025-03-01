'use client';

import { useInView } from 'react-intersection-observer';

import Link from 'next/link';

import Inner from '@/components/common/inner';
import { CommonAvatar } from '@/components/ui/avatar';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import Spinner from '@/components/ui/spinner';
import {
  Tooltip,
  TooltipContent,
  TooltipTitle,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { PATH } from '@/constants/path';
import { useGetLoungeFollowingAuthor } from '@/service/lounge/use-service';
import { Plus } from '@untitled-ui/icons-react';

const AuthorNav = () => {
  const {
    data: authorData,
    isLoading,
    isRefetching,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  } = useGetLoungeFollowingAuthor();

  const { ref } = useInView({
    onChange(inView) {
      if (hasNextPage && !isFetchingNextPage && inView) fetchNextPage();
    },
  });

  const list = authorData?.flattenData;

  return (
    <aside className="flex items-center gap-x-[10px] border-b border-slate-200 ">
      <Inner>
        <div className="flex items-center">
          <div className="px-[15px]">
            <Link href={PATH.searchAuthor}>
              <Tooltip defaultOpen>
                <TooltipTrigger className="flex items-center w-[60px] h-[60px] justify-center aspect-square rounded-full bg-primary py-[28px]">
                  <Plus className="w-[18px] text-white" />
                </TooltipTrigger>
                <TooltipContent side="bottom">
                  <TooltipTitle>작가 찾으러 가기</TooltipTitle>
                </TooltipContent>
              </Tooltip>
            </Link>
          </div>
          {!isLoading ? (
            <ScrollArea className="w-[1200px] h-[142px] whitespace-nowrap py-[28px]">
              <ul className="flex items-center w-full gap-x-[10px]">
                {list?.map((author) => (
                  <li
                    key={author.studioId}
                    className="px-[15px]"
                  >
                    <Link href={PATH.studio(author.studioId)}>
                      <div className="typo-body-14-medium-100-tight flex flex-col  items-center justify-center gap-y-[10px] text-slate-800">
                        <CommonAvatar
                          nickname={author.nickname}
                          src={author.profileImageUrl}
                          className="size-[60px] border"
                        />
                        <div>{author.nickname}</div>
                      </div>
                    </Link>
                  </li>
                ))}
                {isRefetching && (
                  <div className="">
                    <Spinner className="size-[30px]" />
                  </div>
                )}
                <div ref={ref} />
              </ul>
              <ScrollBar orientation="horizontal" />
            </ScrollArea>
          ) : (
            // SKeleton
            <div className="h-[142px] flex items-center justify-center">
              <Spinner className="size-[30px]" />
            </div>
          )}
        </div>
      </Inner>
    </aside>
  );
};

export default AuthorNav;
