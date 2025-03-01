import { z } from 'zod';

export const adminMemberFilterSchema = z.object({
  keyword: z.string().optional(),
  keywordType: z
    .enum(['ALL', 'EMAIL', 'USER_NAME', 'NICKNAME', 'PHONE_NUMBER'])
    .optional(),
  createDateRange: z
    .object({
      from: z.date().optional(),
      to: z.date().optional(),
    })
    .optional(),
  userLevel: z.enum(['ALL', 'USER', 'AUTHOR', 'ADMIN', 'MASTER']),
  userStatus: z.enum(['ALL', 'JOINED', 'LEFT', 'SUSPENDED']),
});
