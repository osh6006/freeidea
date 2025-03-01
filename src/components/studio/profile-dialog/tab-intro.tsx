import { useParams } from 'next/navigation';

import { TabsContent } from '@/components/ui/tabs';
import { useStudioProfileQuery } from '@/service/studio/use-service';
import { format } from 'date-fns';

const TabIntroStyles = {
  list: `flex gap-x-[10px] items-center`,
  title: `w-[80px] typo-body-14-bold-100-tight text-slate-600`,
  desc: `flex-1 typo-body-14-regular-150-tight`,
};

const TabIntro = () => {
  const { id }: { id: string } = useParams();
  const { data: studioInfo } = useStudioProfileQuery(id);

  return (
    <TabsContent value="intro">
      <ul className="space-y-[20px]">
        <li className={TabIntroStyles.list}>
          <span className={TabIntroStyles.title}>소개</span>
          <span className={TabIntroStyles.desc}>
            {studioInfo?.introduction || '아직 작성된 소개글이 없어요.'}
          </span>
        </li>
        <li className={TabIntroStyles.list}>
          <span className={TabIntroStyles.title}>개설일</span>
          <span className={TabIntroStyles.desc}>
            {format(studioInfo?.createdAt || new Date(), 'yyyy.MM.dd')}
          </span>
        </li>
        <li className={TabIntroStyles.list}>
          <span className={TabIntroStyles.title}>팔로워</span>
          <span className={TabIntroStyles.desc}>{studioInfo?.followers}명</span>
        </li>
        <li className={TabIntroStyles.list}>
          <span className={TabIntroStyles.title}>포트폴리오</span>
          <span className={TabIntroStyles.desc}>
            {studioInfo?.portfolios}개
          </span>
        </li>
        <li className={TabIntroStyles.list}>
          <span className={TabIntroStyles.title}>스튜디오 URL</span>
          <span className={TabIntroStyles.desc}>
            {process.env.NEXT_PUBLIC_CLIENT_URL}/studio/{studioInfo?.studioId}
          </span>
        </li>
      </ul>
    </TabsContent>
  );
};

export default TabIntro;
