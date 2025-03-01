import { PropsWithChildren } from 'react';

import ReactQueryProvider from '@/components/provider/react-query-provider';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import { SECOND } from '@/constants/time';

import GlobalDialogs from './global-dialog';

const GlobalProvider = ({ children }: PropsWithChildren) => {
  return (
    <ReactQueryProvider>
      <TooltipProvider delayDuration={0.1 * SECOND}>{children}</TooltipProvider>
      <Toaster />
      <GlobalDialogs />
    </ReactQueryProvider>
  );
};

export default GlobalProvider;
