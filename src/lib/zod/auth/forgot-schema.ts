import { englishAndNumberRegex } from '@/lib/regex';
import { z } from 'zod';

export const forgotEmailSchema = z.object({
  name: z
    .string({
      required_error: '이름을 입력해주세요.',
    })
    .max(10, { message: '10자 이하의 이름을 입력해주세요' })
    .regex(/^[가-힣]+$/, {
      message: '한글로만 입력이 가능합니다',
    }),
  phone: z
    .string({
      required_error: '휴대폰 번호를 입력해주세요.',
    })
    .regex(/^010\d{8}$/, {
      message: '유효한 번호가 아닙니다.',
    }),
  code: z
    .string({
      required_error: '인증번호를 입력해 주세요',
    })
    .length(6, { message: '인증번호는 6자리 숫자여야 합니다.' }),
});

export type forgotEmailSchemaSchemaType = z.infer<typeof forgotEmailSchema>;

export const forgotPasswordSchema = z.object({
  email: z
    .string({
      required_error: '이메일을 입력해주세요.',
    })
    .email({
      message: '사용이 불가능한 이메일 형식입니다.',
    }),
});

export type forgotPasswordSchemaType = z.infer<typeof forgotPasswordSchema>;

export const forgotResetPasswordSchema = z
  .object({
    password: z
      .string({
        required_error: '비밀번호를 입력해 주세요',
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
    'password-check': z.string({
      required_error: '비밀번호를 확인해 주세요',
    }),
  })
  .refine((data) => data.password === data['password-check'], {
    path: ['password-check'],
    message: '비밀번호가 일치하지 않습니다.',
  });

export type forgotResetPasswordSchemaType = z.infer<
  typeof forgotResetPasswordSchema
>;

export const verifyPasswordSchema = z.object({
  number: z
    .string({
      required_error: '인증번호를 입력해 주세요',
    })
    .min(6, {
      message: '인증번호는 6자리 입니다.',
    })
    .max(6, {
      message: '인증번호는 6자리 입니다.',
    }),
});

export type verifyPasswordSchemaType = z.infer<typeof verifyPasswordSchema>;
