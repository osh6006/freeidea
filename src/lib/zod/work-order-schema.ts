import { z } from 'zod';

export const workOrderSchema = z.object({
  prouctId: z.string(),
  options: z
    .array(
      z.object({
        optionGroupId: z.string(),
        optionId: z.string(),
        optionName: z.string(),
        optionPrice: z.number(),
        optionQuantity: z.number(),
      })
    )
    .nonempty(),
  additional: z
    .object({
      checked: z.boolean(),
      count: z.number(),
    })
    .refine(({ checked, count }) => {
      if (checked) return count > 0;
      return true;
    }),
});
