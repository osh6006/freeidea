import { englishAndNumberRegex } from '@/lib/regex';
import { z } from 'zod';

export const emailSchema = z.object({
  value: z
    .string({
      required_error: '이메일을 입력해 주세요',
    })
    .email({
      message: '사용이 불가한 이메일 형식입니다',
    }),
  isDuplicated: z
    .boolean({
      required_error: '이메일 중복체크를 해주세요',
    })
    .refine((isDuplicated) => !isDuplicated, {
      message: '이미 사용중인 이메일입니다',
    }),
});

export const nameSchema = z
  .string({
    required_error: '이름을 입력해 주세요',
  })
  .max(10, { message: '10자 이하의 이름을 입력해주세요' })
  .regex(/^[가-힣]+$/, {
    message: '한글로만 입력이 가능합니다',
  });

export const nicknameSchema = z.object({
  value: z
    .string({
      required_error: '닉네임을 입력해 주세요',
    })
    .min(2, { message: '최소 2자 이상 15자 이하로 입력해 주세요.' })
    .max(15, { message: '최소 2자 이상 15자 이하로 입력해 주세요' })
    .regex(/^[가-힣a-zA-Z0-9]*$/, {
      message:
        '한글, 숫자, 영문만 입력이 가능합니다. 특수문자는 입력할 수 없습니다.',
    }),
  isDuplicated: z
    .boolean({
      required_error: '닉네임 중복체크를 해주세요',
    })
    .refine((isDuplicated) => !isDuplicated, {
      message: '이미 사용중인 닉네임입니다',
    }),
});

export const passwordSchema = z
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

export const phoneSchema = z.object({
  phone: z
    .string({
      required_error: '휴대폰 번호를 입력해 주세요',
    })
    .regex(/^010\d{8}$/, {
      message: '유효한 번호가 아닙니다.',
    }),
  tempToken: z
    .string({
      required_error: '아직 본인인증이 완료되지 않았습니다.',
    })
    .min(1, {
      message: '본인인증이 필요합니다.',
    }),
  code: z
    .string({
      required_error: '인증번호를 입력해 주세요',
    })
    .length(6, { message: '인증번호는 6자리 숫자여야 합니다.' }),
});

export const termsAgreementSchema = z.object({
  allCheck: z.boolean().optional(),
  ageCheck: z
    .boolean({
      required_error: '만 14세 이상 항목에 동의해 주세요.',
    })
    .refine((val) => val === true, {
      message: '만 14세 이상 항목에 동의해 주세요.',
    }),

  serviceCheck: z
    .boolean({
      required_error: '서비스 이용 약관에 동의해 주세요.',
    })
    .refine((val) => val === true, {
      message: '서비스 이용 약관에 동의해 주세요.',
    }),

  indivisualCheck: z
    .boolean({
      required_error: '개인정보 수집 및 이용 항목에 동의해 주세요.',
    })
    .refine((val) => val === true, {
      message: '개인정보 수집 및 이용 항목에 동의해 주세요.',
    }),

  maketingCheck: z.boolean().optional(),
});

export const referrerSchema = z
  .string()
  .optional()
  .transform((val) => (val?.trim() === '' ? undefined : val))
  .refine((val) => !val || /^[가-힣a-zA-Z0-9]*$/.test(val), {
    message:
      '한글, 숫자, 영문만 입력이 가능합니다. 특수문자는 입력할 수 없습니다.',
  })
  .refine((val) => !val || (val.length >= 2 && val.length <= 15), {
    message: '최소 2자 이상 15자 이하로 입력해 주세요.',
  });

export const signUpSchema = z.object({
  email: emailSchema,
  name: nameSchema,
  nickname: nicknameSchema,
  password: passwordSchema,
  phone: phoneSchema.shape.phone,
  code: phoneSchema.shape.code,
  tempToken: phoneSchema.shape.tempToken,
  referrer: referrerSchema,
  isPhoneVerified: z.boolean().refine((val) => val === true, {
    message: '휴대폰 인증이 필요합니다.',
  }),
  allCheck: termsAgreementSchema.shape.allCheck,
  ageCheck: termsAgreementSchema.shape.ageCheck,
  serviceCheck: termsAgreementSchema.shape.serviceCheck,
  indivisualCheck: termsAgreementSchema.shape.indivisualCheck,
  maketingCheck: termsAgreementSchema.shape.maketingCheck,
});

export const kakaoSignUpSchema = z.object({
  referrer: referrerSchema,
});

export const twitterSignUpSchema = z.object({
  email: emailSchema,
  name: nameSchema,
  phone: phoneSchema.shape.phone,
  code: phoneSchema.shape.code,
  tempToken: phoneSchema.shape.tempToken,
  referrer: referrerSchema,
  allCheck: termsAgreementSchema.shape.allCheck,
  ageCheck: termsAgreementSchema.shape.ageCheck,
  serviceCheck: termsAgreementSchema.shape.serviceCheck,
  indivisualCheck: termsAgreementSchema.shape.indivisualCheck,
  maketingCheck: termsAgreementSchema.shape.maketingCheck,
});

export type SignUpSchemaType = z.infer<typeof signUpSchema>;
export type EmailSchemaType = z.infer<typeof emailSchema>;
export type NameSchemaType = z.infer<typeof nameSchema>;
export type NicknameSchemaType = z.infer<typeof nicknameSchema>;
export type PasswordSchemaType = z.infer<typeof passwordSchema>;
export type PhoneSchemaType = z.infer<typeof phoneSchema>;
export type ReferrerType = z.infer<typeof referrerSchema>;
export type TermsAgreementSchemaType = z.infer<typeof termsAgreementSchema>;
export type KakaoSignUpSchemaType = z.infer<typeof kakaoSignUpSchema>;
export type TwitterSignUpSchemaType = z.infer<typeof twitterSignUpSchema>;
