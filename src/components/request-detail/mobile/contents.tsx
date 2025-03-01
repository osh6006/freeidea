import { Separator } from '@/components/ui/separator';

import RequestDetailMobileDetail from './detail';
import RequestDetailMobileInfo from './info';
import RequestDetailMobileProfile from './profile';

const RequestDetailMobileContents = () => {
  return (
    <>
      <RequestDetailMobileProfile />
      <Separator className="my-5 pc-screen:hidden" />
      <RequestDetailMobileInfo />
      <RequestDetailMobileDetail />
    </>
  );
};

export default RequestDetailMobileContents;
