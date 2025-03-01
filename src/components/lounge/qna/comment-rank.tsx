'use client';

import { useState } from 'react';

import Link from 'next/link';

import { CommonAvatar } from '@/components/ui/avatar';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import { PATH } from '@/constants/path';
import { cn } from '@/lib/utils';
import { useQnaRecentActiveAuthorsQuery } from '@/service/qna/use-service';
import { IQnaActiveAuthor } from '@/types/qna';
import { ChevronDown } from '@untitled-ui/icons-react';

const QnaCommentRank = () => {
  const [isOpen, setIsOpen] = useState(false);

  const { data } = useQnaRecentActiveAuthorsQuery();

  const isData = !!data?.length;

  return (
    <div className="h-full w-[410px] px-[30px] pb-[30px]">
      <div className="typo-body-16-medium-100-tight">
        최근 답변이 활발한 작가
      </div>
      {!isData ? (
        <div className="mt-[30px] h-[163px] flex items-center justify-center typo-body-14-bold-100-tight bg-slate-50">
          최근 7일간 활동중인 작가가 없어요
        </div>
      ) : (
        <Collapsible
          open={isOpen}
          onOpenChange={setIsOpen}
        >
          <div className="flex flex-col gap-y-2 mt-[10px]">
            {data?.slice(0, 3).map((rankInfo) => {
              return (
                <Link
                  href={`${PATH.studio(rankInfo.studioId)}?tab=board`}
                  key={rankInfo.userId}
                >
                  <CommentRankCard
                    key={rankInfo.userId}
                    {...rankInfo}
                  />
                </Link>
              );
            })}
          </div>
          <CollapsibleContent className="mt-[10px] flex flex-col gap-y-2 p-0">
            {data?.slice(3, 10).map((rankInfo) => {
              return (
                <Link
                  href={`${PATH.studio(rankInfo.studioId)}?tab=board`}
                  key={rankInfo.userId}
                >
                  <CommentRankCard
                    key={rankInfo.userId}
                    {...rankInfo}
                  />
                </Link>
              );
            })}
          </CollapsibleContent>

          <CollapsibleTrigger className="flex items-center gap-x-[10px] mt-[20px] typo-body-16-medium-100-tight text-slate-500">
            {!isOpen ? '더보기' : '줄이기'}
            <ChevronDown className={cn('', isOpen ? 'rotate-180' : '')} />
          </CollapsibleTrigger>
        </Collapsible>
      )}
    </div>
  );
};

const CommentRankCard = ({
  nickname,
  introduction,
  profileImageUrl,
  userId,
  ranking,
}: IQnaActiveAuthor) => {
  return (
    <div className="flex items-center gap-x-[10px] hover:bg-slate-50 px-2 py-2 rounded-md">
      <span
        className={cn(
          'typo-body-14-medium-100-tight basis-[30px]',
          ranking == 1 && 'text-primary'
        )}
      >{`${ranking}위`}</span>
      <span>
        <CommonAvatar
          nickname={nickname}
          src={profileImageUrl}
          className="size-10 border"
        />
      </span>
      <span className="space-y-[6px]">
        <div className="typo-body-14-bold-100-tight">{nickname}</div>
        <div className="typo-body-14-regular-150-tight text-slate-500">
          {introduction}
        </div>
      </span>
    </div>
  );
};

export default QnaCommentRank;
