'use client';

import { CommonAvatar } from '@/components/ui/avatar';
import { useQnaAuthorListByCategoryQuery } from '@/service/qna/use-service';

const QnaDetailRecommendAuthor = () => {
  const { data: authorList } = useQnaAuthorListByCategoryQuery();

  return (
    <div className="border border-slate-200 rounded-[10px] p-5 typo-body-16-bold-100-tight">
      <div className="">이 작가님은 어때요?</div>
      <div className="typo-body-14-regular-150-tight text-slate-400 mt-[10px]">
        이 분야의 <strong>전문 작가님</strong>을 소개해 드려요
      </div>

      {authorList ? (
        <ul className="space-y-[10px] mt-[30px]">
          {authorList.map((profile) => {
            return (
              <li
                key={profile.userId}
                className="flex items-center gap-x-[10px]"
              >
                <CommonAvatar
                  nickname={profile.nickname}
                  src={profile.profileImageUrl}
                  className="size-10"
                />
                <div className="flex flex-col typo-body-14-regular-150-tight">
                  <div className="typo-body-14-bold-100-tight">
                    {profile.nickname}
                  </div>
                  <div>{profile.introduction}</div>
                </div>
              </li>
            );
          })}
        </ul>
      ) : (
        <div className="flex items-center justify-center mt-[30px] bg-slate-50 typo-body-14-bold-100-tight h-[164px]">
          곧 추천해 드릴게요!
        </div>
      )}
    </div>
  );
};

export default QnaDetailRecommendAuthor;
