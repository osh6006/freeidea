import { z } from 'zod';

export const reportSchema = z.object({
  title: z
    .string({
      required_error: '신고 제목을 입력해주세요.',
    })
    .min(5, {
      message: '제목은 5글자 이상이어야 합니다.',
    })
    .max(40, {
      message: '제목은 40글자 이하이어야 합니다.',
    }),
  contents: z
    .string({
      required_error: '신고 내용을 입력해주세요.',
    })
    .min(5, {
      message: '5글자 이상의 내용을 입력해주세요.',
    })
    .max(100, {
      message: '100자 이하의 내용을 입력해주세요.',
    }),
});

export type ReportSchemaType = z.infer<typeof reportSchema>;
