import { Level } from '@/types/auth';

const EmptyFeed = ({ level }: { level: Level | 'GUEST' }) => {
  return (
    <section className="pt-[200px] flex items-center justify-center text-slate-800 typo-title-24-bold-140-tight">
      <div className="my-[100px]">
        {level === 'GUEST' && '로그인을 해주세요'}
        {level === 'USER' && '작가를 팔로우 해보세요'}
        {level === 'AUTHOR' && '첫 번째 피드를 올려보세요!'}
      </div>
    </section>
  );
};

export default EmptyFeed;
