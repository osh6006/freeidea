import SeperatorDot from '@/components/common/seperator-dot';
import { CommonAvatar } from '@/components/ui/avatar';
import { categoryDict } from '@/constants/dictionary';
import { formatRelativeDate } from '@/lib/date';
import { extensions } from '@/lib/tiptab/common-options';
import { cn, formatSocialNumber } from '@/lib/utils';
import { IQna } from '@/types/qna';
import { useEditor } from '@tiptap/react';

const QnaCard = ({
  category,
  title,
  contents,
  answers,
  answeredUsers,
  createdAt,
  viewCount,
}: IQna) => {
  const activeCategory = categoryDict
    .getTranslator('en-ko')
    .translate(category);

  const editor = useEditor({
    content: contents || '',
    shouldRerenderOnTransaction: false,
    immediatelyRender: false,
    editable: false,
    extensions: extensions,
  });

  return (
    <div className="flex flex-col border-b border-slate-200 pb-[30px] hover:bg-slate-50 transition-colors rounded-md p-[10px]">
      <div className="text-slate-500 typo-body-14-regular-150-tight">
        {activeCategory}
      </div>
      <h1 className="mt-4 typo-title-24-medium-150-tight line-clamp-2 ">
        {title}
      </h1>
      <div className="mt-[30px] line-clamp-1">{editor?.getText()}</div>
      <div className="flex items-center mt-[30px]">
        <span className="flex items-center -space-x-3">
          {answeredUsers?.map((user) => (
            <CommonAvatar
              key={user.userId}
              nickname={user.nickname}
              src={user.profileImageUrl}
              className="border"
            />
          ))}
        </span>
        <span
          className={cn(
            'text-slate-500 typo-body-14-regular-150-tight ',
            answeredUsers.length > 0 && 'ml-[10px] '
          )}
        >{`답변 ${formatSocialNumber(answers)}개`}</span>
      </div>
      <div className="flex items-center gap-x-[6px] typo-body-14-regular-150-tight text-slate-500 mt-[10px]">
        <div>{formatRelativeDate(createdAt)}</div>
        <SeperatorDot />
        <div>조회 {formatSocialNumber(viewCount || 0)}</div>
      </div>
    </div>
  );
};

export default QnaCard;
