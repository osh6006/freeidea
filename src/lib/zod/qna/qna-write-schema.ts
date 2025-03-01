import { koreanOrNumberWithSpacesRegex } from '@/lib/regex';
import { getTextFromHtml } from '@/lib/utils';
import { TCategory } from '@/types/common';
import { z } from 'zod';

export const qnaWriteSchema = z.object({
  category: z
    .string({
      required_error: '카테고리를 선택해 주세요.',
    })
    .refine(
      (data): data is TCategory | string => {
        const validCategories: TCategory[] = [
          'ILLUSTRATION',
          'VIRTUAL',
          'WEBTOON',
          'WRITING',
          'DESIGN',
        ];
        return validCategories.includes(data as TCategory);
      },
      { message: '카테고리를 선택해 주세요.' }
    ),
  tags: z
    .array(
      z
        .string()
        .min(1, { message: '최소 1자 이상 입력해주세요.' })
        .max(11, { message: '최대 11자의 태그를 입력할 수 있습니다.' })
    )
    .max(10, { message: '최대 10개의 태그를 입력할 수 있습니다.' })
    .nonempty({ message: '태그를 최소 1개 이상 입력해주세요.' })
    .refine(
      (tags) => tags.every((tag) => koreanOrNumberWithSpacesRegex.test(tag)),
      {
        message: '한글(자음, 모음 불가) 또는 숫자만 입력할 수 있습니다.',
      }
    ),
  title: z
    .string({ required_error: '제목을 입력해주세요.' })
    .min(1, { message: '제목을 입력해주세요.' })
    .max(45, { message: '45자 이하의 제목을 입력해주세요' }),
  contents: z
    .string()
    .refine(
      (contents) => {
        return getTextFromHtml(contents).length >= 10;
      },
      { message: '10글자 이상의 내용을 입력해주세요.' }
    )
    .refine(
      (contents) => {
        return getTextFromHtml(contents).length <= 3000;
      },
      { message: '3000 이하의 내용을 입력해주세요.' }
    ),
});
