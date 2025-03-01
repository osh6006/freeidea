import { englishAndNumberRegex } from '@/lib/regex';
import { z } from 'zod';

export const profileSchema = z.object({
  profileImage: z.object({
    id: z.string().optional(),
    url: z.string().optional(),
  }),
  nickname: z
    .string({
      required_error: '닉네임을 입력해 주세요',
    })
    .min(2, { message: '최소 2자 이상 15자 이하로 입력해 주세요.' })
    .max(15, { message: '최소 2자 이상 15자 이하로 입력해 주세요' })
    .regex(/^[가-힣a-zA-Z0-9]*$/, {
      message:
        '한글, 숫자, 영문만 입력이 가능합니다. 특수문자는 입력할 수 없습니다.',
    }),
  introduction: z
    .string()
    .max(20, { message: '최대 20자까지 입력 가능합니다.' }),
  email: z.string().email({ message: '사용이 불가한 이메일 형식입니다' }),
  tempToken: z.string().optional(),
});

export const profileChangePasswordSchema = z
  .object({
    currentPassword: z
      .string({
        required_error: '현재 비밀번호를 입력해 주세요',
      })
      .min(8, {
        message: '최소 8자 이상 20자 이하로 입력해 주세요',
      })
      .max(20, {
        message: '최소 8자 이상 20자 이하로 입력해 주세요',
      })
      .regex(englishAndNumberRegex, {
        message: '영문과 숫자를 포함해 주세요',
      }),
    newPassword: z
      .string({
        required_error: '새로운 비밀번호를 입력해 주세요',
      })
      .min(8, {
        message: '최소 8자 이상 20자 이하로 입력해 주세요',
      })
      .max(20, {
        message: '최소 8자 이상 20자 이하로 입력해 주세요',
      })
      .regex(englishAndNumberRegex, {
        message: '영문과 숫자를 포함해 주세요',
      }),
    'newPassword-check': z.string({
      required_error: '새로운 비밀번호를 다시 입력해 주세요',
    }),
  })
  .refine((data) => data.newPassword === data['newPassword-check'], {
    path: ['newPassword-check'],
    message: '비밀번호가 일치하지 않습니다.',
  });

export type ProfileSchemaType = z.infer<typeof profileSchema>;

export type ProfileChangePasswordSchemaType = z.infer<
  typeof profileChangePasswordSchema
>;
