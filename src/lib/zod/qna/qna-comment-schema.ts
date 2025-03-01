import { z } from 'zod';

export const qnaCommentSchema = z.object({
  comment: z
    .string({ required_error: '댓글을 입력해주세요.' })
    .min(2, { message: '최소 2자 이상 입력해 주세요.' })
    .max(300, { message: '최대 300자까지 입력가능합니다.' }),
});
