import { getTextFromHtml } from '@/lib/utils';
import { z } from 'zod';

export const qnaAnswerWriteSchema = z.object({
  contents: z
    .string()
    .refine(
      (contents) => {
        return getTextFromHtml(contents).length >= 10;
      },
      { message: '10자 이상의 내용을 입력해주세요.' }
    )
    .refine(
      (contents) => {
        return getTextFromHtml(contents).length <= 3000;
      },
      {
        message: '3000자 이상은 입력할 수 없어요',
      }
    ),
});
