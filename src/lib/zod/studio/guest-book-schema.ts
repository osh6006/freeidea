import { z } from 'zod';

export const guestBookSchema = z.object({
  contents: z
    .string({ required_error: '내용을 입력해주세요.' })
    .min(5, { message: '최소 5글자 이상 입력해 주세요' })
    .max(100, { message: '최대 100자까지 입력가능합니다.' }),
});
