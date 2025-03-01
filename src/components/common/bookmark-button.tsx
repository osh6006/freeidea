import { cn } from '@/lib/utils';

import { Icon } from '../icon';

interface BookMarkButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  isScrapping: boolean;
}

/**
 * @deprecated <Icon.BookmarkToner />, <Icon.BookmarkTonerSelect /> 를 사용해주세요
 */
const BookMarkButton = ({
  isScrapping,
  className,
  onClick,
}: BookMarkButtonProps) => {
  return (
    <button
      onClick={onClick}
      className={cn(
        'flex items-center justify-center rounded-full  absolute bottom-0 right-0 p-1.5',
        !isScrapping ? 'bg-[#71768066]/40' : 'bg-transparent',
        className
      )}
    >
      {isScrapping ? (
        <Icon.BookmarkSelect className={cn('size-[20px]')} />
      ) : (
        <Icon.BookmarkTonerSelect className={cn('size-[20px]')} />
      )}
    </button>
  );
};

export default BookMarkButton;
