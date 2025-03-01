import SignUpForm from '@/components/auth/sign-up-form';
import { SignUpSchemaType } from '@/lib/zod/auth/sign-in-schema';
import { getRandomNickname } from '@/service/auth/service';

export default async function SignUpPage() {
  const { nickname: randomNickname } = await getRandomNickname().catch(() => ({
    nickname: '',
  }));

  const defaultValues: SignUpSchemaType = {
    nickname: {
      value: randomNickname,
      isDuplicated: false,
    },
    name: '',
    email: {
      value: '',
      isDuplicated: false,
    },
    password: {
      password: '',
      'password-check': '',
    },
    isPhoneVerified: false,
    phone: '',
    code: '',
    tempToken: '',
    ageCheck: false,
    serviceCheck: false,
    indivisualCheck: false,
    maketingCheck: false,
  };

  return <SignUpForm defaultValues={defaultValues} />;
}
