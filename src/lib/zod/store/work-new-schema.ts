import { string, z } from 'zod';

import { getTextFromHtml } from '../../utils';
import { hastagSchema } from '../common-schema';

export const workNewSchema = z.object({
  title: z
    .string()
    .min(5, { message: '5글자 이상의 제목을 입력해주세요.' })
    .max(40, { message: '40글자 이하의 제목을 입력해주세요.' }),

  thumbnails: z
    .array(
      z.object({
        file: z.custom<File>(),
        fileId: z.string(),
        fileUrl: z.string().optional(),
        status: z.enum(['loading', 'error', 'success']),
      })
    )
    .min(1, { message: '썸네일 이미지를 추가해주세요.' })
    .max(6, { message: '최대 6장까지 업로드 가능합니다.' }),

  category: z.string().min(1, { message: '카테고리를 선택해주세요.' }),

  tags: hastagSchema,

  fileTypes: z
    .array(z.string())
    .min(1, { message: '1개 이상의 파일 제공 형태를 선택해주세요.' })
    .max(5, { message: '5개 이하의 파일 제공 형태를 선택해주세요.' }),

  modifyCount: z.string().min(1, { message: '수정 횟수를 선택해주세요.' }),

  workDays: z.string().min(1, { message: '작업 기간을 선택해주세요.' }),

  useRange: z
    .string()
    .array()
    .refine((element) => !!element[0], {
      message: '사용 범위를 선택해주세요.',
    }),

  optionGroups: z.array(
    z.object({
      optionGroupId: string().min(1),
      optionGroupName: z
        .string()
        .min(2, { message: '2글자 이상의 제목을 입력해주세요.' })
        .max(30, { message: '30글자 이하의 제목을 입력해주세요.' }),
      options: z
        .array(
          z.object({
            optionId: string().min(1),
            optionName: z
              .string()
              .min(2, { message: '2글자 이상의 옵션 명을 입력해주세요.' })
              .max(30, { message: '30글자 이하의 옵션 명을 입력해주세요.' }),
            optionPrice: z
              .number()
              .min(1_000, { message: '1,000원 이상의 금액을 입력해주세요.' })
              .max(100_000_000, {
                message: '100,000,000원 이하의 금액을 입력해주세요.',
              }),
          })
        )
        .min(1, { message: '옵션은 필수로 1개를 작성해야합니다.' }),
    })
  ),

  contents: z
    .string()
    .refine((contents) => getTextFromHtml(contents).length >= 10, {
      message: '10글자 이상의 내용을 입력해주세요.',
    })
    .refine((contents) => getTextFromHtml(contents).length <= 3000, {
      message: '3000글자 이하의 내용을 입력해주세요.',
    }),
});
