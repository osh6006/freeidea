'use client';

import {
  SubmitErrorHandler,
  SubmitHandler,
  useFormContext,
} from 'react-hook-form';

import { FORM_ID } from '@/constants/form-id';
import { useToast } from '@/hooks/use-toast';
import {
  useCreatePortfolio,
  useUpdatePortfolio,
} from '@/service/portfolio/use-service';
import { useAccordionStore } from '@/store/portfolio/portfolio-new';
import {
  PortfolioNewSchemaType,
  PortfolioWriteRequestType,
} from '@/types/portfolio';

export function PortfolioWriteForm({
  children,
}: {
  children: React.ReactNode;
}) {
  const { mutate: createPortfolioMutate } = useCreatePortfolio();
  const handleSubmit = useHandleSubmit(createPortfolioMutate);

  return (
    <form
      id={FORM_ID.portfolioWrite}
      onSubmit={handleSubmit}
    >
      {children}
    </form>
  );
}

export function PortfolioUpdateForm({
  children,
  id,
}: {
  children: React.ReactNode;
  id: string;
}) {
  const { mutate: updatePortfolioMutate } = useUpdatePortfolio(id);

  const handleSubmit = useHandleSubmit(updatePortfolioMutate);

  return (
    <form
      id={FORM_ID.portfolioWrite}
      onSubmit={handleSubmit}
    >
      {children}
    </form>
  );
}

function useHandleSubmit(mutate: (body: PortfolioWriteRequestType) => void) {
  const { handleSubmit } = useFormContext<PortfolioNewSchemaType>();
  const { toast } = useToast();
  const { setExpended } = useAccordionStore();

  const onValid: SubmitHandler<PortfolioNewSchemaType> = (data) => {
    mutate(convertData(data));
  };

  const onInvalid: SubmitErrorHandler<PortfolioNewSchemaType> = (error) => {
    if (error.commentUsage || error.showUsage || error.tags) setExpended(true);
    toast({
      variant: 'destructive',
      description: '유효하지 않은 값이 있습니다.',
    });
  };

  return handleSubmit(onValid, onInvalid);
}

function convertData(data: PortfolioNewSchemaType) {
  const {
    portfolioImages,
    commentUsage,
    showUsage,
    challenge,
    tags,
    contents,
    title,
  } = data;

  const ids = portfolioImages
    .map((portfolio) => portfolio.id)
    .filter((id) => id !== undefined);

  const isCommentUsed = commentUsage === 'on';
  const isShown = showUsage === 'public';
  const isChallengeApplied = challenge.usage === 'on';

  const body: PortfolioWriteRequestType = {
    title,
    contents,
    tags,
    isCommentUsed,
    isShown,
    portfolioImageIds: ids,
    challengeId: isChallengeApplied ? challenge.id : undefined,
    applyChallenge: isChallengeApplied,
  };

  return body;
}
