import { z } from 'zod';

const MAX_FILE_SIZE = 10 * 1024 * 1024;
const ALLOWED_FILE_TYPES = [
  'image/jpeg',
  'image/png',
  'image/gif',
  'image/webp',
  'image/avif',
];

export const imageFileSchema = z
  .custom<File>()
  .refine((file) => file.size <= MAX_FILE_SIZE, {
    message: `파일은 ${MAX_FILE_SIZE / (1024 * 1024)}MB 이하의 파일을 올려주세요!`,
  })
  .refine((file) => ALLOWED_FILE_TYPES.includes(file.type), {
    message: '올바른 파일 형식이 아니에요!',
  });

export const validateImageResolution = async (
  file: File
): Promise<{ success: boolean; errors?: string[] }> => {
  const baseValidation = imageFileSchema.safeParse(file);

  if (!baseValidation.success) {
    return {
      success: false,
      errors: baseValidation.error.errors.map((err) => err.message),
    };
  }

  const image = new Image();
  return new Promise((resolve) => {
    const reader = new FileReader();

    reader.onload = () => {
      if (reader.result) {
        image.src = reader.result as string;
      }
    };

    image.onload = () => {
      const { width, height } = image;

      if (width < 1020 || height < 460) {
        resolve({
          success: false,
          errors: ['1020x460 이상의 이미지를 사용해 주세요!'],
        });
      } else if (width > 4320 || height > 2160) {
        resolve({
          success: false,
          errors: ['4320x2160 이하의 이미지를 사용해 주세요!'],
        });
      } else {
        resolve({ success: true });
      }
    };

    image.onerror = () => {
      resolve({ success: false, errors: ['이미지를 읽는 데 실패했습니다.'] });
    };

    reader.readAsDataURL(file);
  });
};
