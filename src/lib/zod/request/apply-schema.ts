import { z } from 'zod';

export const applySchema = z.object({
  urlAddress: z
    .string({
      required_error: '작품 URL을 입력해 주세요',
    })
    .url({
      message: '올바른 URL을 입력하지 않았습니다.',
    }),
  estimatedBudget: z.string({
    required_error: '예상 금액을 선택해 주세요',
  }),
  estimatedDate: z.string({
    required_error: '예상 소요일을 선택해 주세요',
  }),
  memo: z
    .string({
      required_error: '메모를 입력해 주세요',
    })
    .max(100, {
      message: '메모는 100자까지만 입력이 가능합니다.',
    })
    .optional(),
});

export type ApplySchemaType = z.infer<typeof applySchema>;
