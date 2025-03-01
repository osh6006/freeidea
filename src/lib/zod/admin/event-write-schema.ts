import { getTextFromHtml } from '@/lib/utils';
import { z } from 'zod';

export const eventWriteSchema = z.object({
  publishedAt: z.date({ required_error: '게시일을 선택해 주세요' }),
  thumbnailImageId: z
    .string({
      required_error: '썸네일 이미지를 업로드 해주세요',
    })
    .uuid({
      message: '썸네일 이미지가 없어요',
    }),
  thumbnailImageUrl: z.string().optional(),

  title: z
    .string({ required_error: '제목을 입력해 주세요.' })
    .min(5, {
      message: '5자 이상 입력해 주세요',
    })
    .max(23, '최대 23자 까지 입력이 가능합니다.'),
  description: z
    .string({ required_error: '설명을 입력해 주세요.' })
    .min(10, {
      message: '10자 이상 입력해 주세요',
    })
    .max(98, '최대 98자 까지 입력이 가능합니다.'),

  contents: z
    .string({ required_error: '내용을 입력해 주세요.' })
    .refine(
      (contents) => {
        return getTextFromHtml(contents).length >= 10;
      },
      { message: '10글자 이상의 내용을 입력해 주세요.' }
    )
    .refine(
      (contents) => {
        return getTextFromHtml(contents).length <= 5000;
      },
      { message: '5000자 이하의 내용을 입력해 주세요.' }
    ),
});
