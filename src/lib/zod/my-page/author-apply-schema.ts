import { z } from 'zod';

export const AuthorApplyFormSchema = z.object({
  snsType: z.string({
    required_error: 'SNS 종류를 선택해 주세요',
  }),
  name: z
    .string({
      required_error: '이름을 입력해 주세요',
    })
    .min(2, { message: '2자 이상의 이름을 입력해 주세요' })
    .max(10, { message: '10자 이하의 이름을 입력해 주세요' })
    .regex(/^[가-힣]+$/, {
      message: '한글로만 입력이 가능합니다',
    }),

  snsLinkUrl: z
    .string()
    .url({
      message: '유효하지 않은 url 입니다.',
    })
    .optional(),

  productImageIds: z
    .array(z.string(), {
      message: '유효한 이미지 ID를 입력해 주세요.',
    })
    .optional(),
});
