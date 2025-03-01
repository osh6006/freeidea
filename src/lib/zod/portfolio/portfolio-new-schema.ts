import { getTextFromHtml } from '@/lib/utils';
import { z } from 'zod';

import { hastagSchema } from '../common-schema';

export const portfolioNewSchema = z.object({
  title: z
    .string({ required_error: '제목을 입력해주세요.' })
    .min(1, { message: '제목을 입력해주세요.' })
    .max(20, { message: '최대 20자의 제목을 입력할 수 있습니다.' }),

  contents: z
    .string()
    .refine((contents) => getTextFromHtml(contents).length <= 500, {
      message: '최대 500자의 내용을 입력할 수 있습니다.',
    })
    .optional(),

  tags: hastagSchema,

  challenge: z.discriminatedUnion(
    'usage',
    [
      z.object({
        usage: z.literal('on'),
        id: z.string({ required_error: '챌린지 ID를 입력해주세요.' }),
        number: z.number({ required_error: '챌린지 번호를 입력해주세요.' }),
      }),
      z.object({
        usage: z.literal('off'),
        id: z.string().optional(),
        number: z.number().optional(),
      }),
    ],
    {
      errorMap: (issue, ctx) => {
        if (issue.code === 'invalid_union_discriminator') {
          return { message: '도전작 지원여부를 선택해주세요.' };
        }
        return { message: ctx.defaultError };
      },
    }
  ),

  showUsage: z.enum(['public', 'private'], {
    message: '공개 여부를 설정해주세요.',
  }),

  commentUsage: z.enum(['on', 'off'], {
    message: '댓글 사용 여부를 설정해주세요.',
  }),

  portfolioImages: z
    .object({
      id: z.string(),
      url: z.string().optional(),
      status: z.enum(['loading', 'success', 'error', 'unselected']),
    })
    .refine((image) => image.status !== 'unselected', {
      message: '유효하지 않은 값이 있습니다.',
    })
    .array()
    .min(1, { message: '최소 1개 이상의 이미지를 업로드해주세요.' })
    .max(10, { message: '최대 업로드 가능한 이미지 개수를 초과하였습니다.' })
    .refine((images) => images.some(({ id }) => id !== undefined), {
      message: '최소 1개 이상의 이미지를 업로드해주세요.',
    }),
});
