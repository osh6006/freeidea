import { z } from 'zod';

export const commentNewSchema = z.object({
  comment: z
    .string({ required_error: '댓글을 입력해주세요.' })
    .max(100, { message: '최대 100자까지 입력가능합니다.' }),
});

export type CommentNewSchemaType = z.infer<typeof commentNewSchema>;
