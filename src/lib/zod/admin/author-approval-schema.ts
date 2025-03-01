import { z } from 'zod';

export const authorApprovalSchema = z.object({
  keywordType: z
    .enum(['', 'ALL', 'EMAIL', 'USER_NAME', 'NICKNAME', 'PHONE_NUMBER'])
    .optional(),
  keyword: z.string().optional(),
  applyDateRange: z
    .object({
      from: z.date().optional(),
      to: z.date().optional(),
    })
    .optional(),
  examineDateRange: z
    .object({
      from: z.date().optional(),
      to: z.date().optional(),
    })
    .optional(),
  requestStatus: z.enum(['', 'CREATED', 'APPROVED', 'REJECTED']).optional(),
});
