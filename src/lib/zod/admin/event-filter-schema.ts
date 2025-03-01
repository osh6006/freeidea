import { z } from 'zod';

export const adminEventFilterSchema = z.object({
  keywordType: z.enum(['TITLE', 'CONTENTS', 'TITLE_AND_CONTENTS']).optional(),
  keyword: z.string().optional(),
  createDateRange: z
    .object({
      from: z.date().optional(),
      to: z.date().optional(),
    })
    .optional(),
  publishDateRange: z
    .object({
      from: z.date().optional(),
      to: z.date().optional(),
    })
    .optional(),
  isUsed: z.string().optional(),
});
