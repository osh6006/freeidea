'use client';

import Link from 'next/link';

import FeedWriteDialog from '../feed/write/dialog';
import { Button } from '../ui/button';

const TabEmpty = ({
  title,
  buttonTitle,
  path,
  isFeed,
  isMe,
}: {
  title: string;
  buttonTitle?: string;
  path?: string;
  isFeed?: boolean;
  isMe: boolean;
}) => {
  return (
    <section className="h-[482px] flex flex-col items-center justify-center space-y-[34px]">
      <h2 className="typo-title-24-bold-140-tight">{title}</h2>
      {isFeed && isMe ? (
        <>
          <FeedWriteDialog>
            <Button variant="outline">{buttonTitle}</Button>
          </FeedWriteDialog>
        </>
      ) : (
        <>
          {buttonTitle && path && isMe && (
            <Link href={path}>
              <Button variant="outline">{buttonTitle}</Button>
            </Link>
          )}
        </>
      )}
    </section>
  );
};

export default TabEmpty;
