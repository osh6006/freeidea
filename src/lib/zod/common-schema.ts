import { withoutSpecialCharacterRegex } from '@/lib/regex';
import { z } from 'zod';

export const hastagSchema = z
  .array(z.string())
  .min(1, { message: '태그를 최소 1개 이상 입력해주세요.' })
  .max(10, { message: '최대 10개의 태그를 입력할 수 있습니다.' })
  .refine(
    (tags) => tags.every((tag) => withoutSpecialCharacterRegex.test(tag)),
    {
      message: '특수문자는 입력할 수 없습니다.',
    }
  );

export const commentNewSchema = z.object({
  comment: z
    .string({ required_error: '댓글을 입력해주세요.' })
    .max(100, { message: '최대 100자까지 입력가능합니다.' }),
});

export const chatMessageSchema = z.object({
  message: z
    .string({ required_error: '메시지를 입력해주세요.' })
    .min(1, { message: '메시지를 입력해주세요.' }),
  file: z.custom<File>().optional(),
});

export type ChatMessageSchemaType = z.infer<typeof chatMessageSchema>;
export type CommentNewSchemaType = z.infer<typeof commentNewSchema>;
