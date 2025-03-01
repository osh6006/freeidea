'use client';

import { useQueryClient } from '@tanstack/react-query';

function MutationErrorBoundary({ children }: { children: React.ReactNode }) {
  const queryClient = useQueryClient();

  return <>{children}</>;
}

export default MutationErrorBoundary;
