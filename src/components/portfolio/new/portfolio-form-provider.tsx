'use client';

import { useForm } from 'react-hook-form';

import { useParams } from 'next/navigation';

import { portfolioNewSchema } from '@/lib/zod/portfolio/portfolio-new-schema';
import {
  challengeListQueryOption,
  portfolioEditDataQueryOption,
} from '@/service/portfolio/query-option';
import { usePortfolioEditData } from '@/service/portfolio/use-service';
import { PortfolioNewSchemaType } from '@/types/portfolio';
import { zodResolver } from '@hookform/resolvers/zod';
import { useQuery } from '@tanstack/react-query';

import { Form } from '../../ui/form';

function PortfolioFormProvider({ children }: { children: React.ReactNode }) {
  const { data: challengeList } = useQuery(challengeListQueryOption());

  const form = useForm<PortfolioNewSchemaType>({
    resolver: zodResolver(portfolioNewSchema),
    defaultValues: {
      title: '',
      contents: '',
      tags: [],
      challenge: {
        usage: undefined,
        id: challengeList?.at(-1)?.challengeId,
        number: challengeList?.at(-1)?.challengeNumber,
      },
      commentUsage: undefined,
      showUsage: undefined,
      portfolioImages: [],
    },
  });

  return <Form {...form}>{children}</Form>;
}

export default PortfolioFormProvider;

export function PortfolioUpdateFormProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { id } = useParams<{ id: string }>();
  const { data: editData } = usePortfolioEditData(id);
  const {
    title,
    contents,
    tags,
    applyChallenge,
    challengeId,
    challengeNumber,
    isShown,
    isCommentUsed,
    portfolioImages,
  } = editData ?? {};

  const form = useForm<PortfolioNewSchemaType>({
    resolver: zodResolver(portfolioNewSchema),
    defaultValues: {
      title,
      contents: contents,
      tags: tags,
      challenge: {
        usage: applyChallenge ? 'on' : 'off',
        id: challengeId ?? undefined,
        number: challengeNumber ?? undefined,
      },
      showUsage: isShown ? 'public' : 'private',
      commentUsage: isCommentUsed ? 'on' : 'off',
      portfolioImages: portfolioImages?.map(({ fileId, fileUrl }) => ({
        id: fileId,
        url: fileUrl,
        status: 'success',
      })),
    },
  });

  return <Form {...form}>{children}</Form>;
}
