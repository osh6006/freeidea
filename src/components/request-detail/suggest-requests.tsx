import RequestCard from '@/components/request/request-card';
import { IRequest } from '@/types/request';

import RequestMobileCard from '../request/mobile/request-card';

const SuggestRequests = ({
  recentNonExpiredCards,
}: {
  recentNonExpiredCards: IRequest[];
}) => {
  const isLength = recentNonExpiredCards.length;

  if (!isLength) {
    return null;
  }

  return (
    <div className="flex flex-col gap-[20px] px-[20px] pc-screen:px-0">
      <div className="text-slate-800 text-[20px] font-[700]">
        이 의뢰는 어때요?
      </div>
      <div className="mb-[200px]">
        <ul className="flex flex-col">
          {recentNonExpiredCards.map((item) => (
            <li
              key={item.inquiryId}
              className="last:border-[1px] border-slate-200 border-t-transparent border-r-transparent border-l-transparent"
            >
              <RequestCard
                {...item}
                key={item.inquiryId}
                className="hidden md:block"
              />
              <RequestMobileCard
                {...item}
                key={item.inquiryId}
                className="md:hidden"
              />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default SuggestRequests;
