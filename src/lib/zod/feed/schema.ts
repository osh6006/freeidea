import { z } from 'zod';

const feedProductSchema = z.object({
  productId: z.string(),
  positionX: z
    .number()
    .min(0, { message: 'X 좌표는 0 이상의 값이어야 합니다.' }),
  positionY: z
    .number()
    .min(0, { message: 'Y 좌표는 0 이상의 값이어야 합니다.' }),
});

const feedDataSchema = z.object({
  feedImageId: z.string(),
  products: z.array(feedProductSchema).optional(),
});

export const feedWriteSchema = z
  .object({
    feedImages: z.array(feedDataSchema),
    contents: z
      .string({ required_error: '내용을 입력해주세요.' })
      .min(5, { message: '5글자 이상 입력해 주세요!' })
      .max(500, { message: '최대 500자까지 입력 가능합니다.' }),
  })
  .refine(
    (data) => {
      const hasEmptyProductId = data.feedImages.some((feedImage) =>
        feedImage.products?.some((product) => !product.productId)
      );
      if (hasEmptyProductId) {
        return false;
      }
      return true;
    },
    {
      message: '작품 태그를 선택해 주세요',
    }
  );
