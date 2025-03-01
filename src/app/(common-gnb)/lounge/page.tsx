import ScrollUpButton from '@/components/common/scroll-up-button';
import AuthorNav from '@/components/lounge/author-nav';
import LoungeFeedList from '@/components/lounge/feed/list';
import { metadataMap } from '@/lib/metadata';

export const metadata = metadataMap.feed;

export default function LoungePage() {
  return (
    <main>
      <AuthorNav />
      <div className="pt-[50px] pb-[200px]">
        <LoungeFeedList />
      </div>
      <ScrollUpButton />
    </main>
  );
}
