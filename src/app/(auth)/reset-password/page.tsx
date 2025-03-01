'use client';

import { Suspense } from 'react';

import ResetPasswordForm from '@/components/auth/reset-password-form';

export default function ResetPassword() {
  return (
    <main className="min-h-dvh w-dvw flex items-center justify-center bg-white">
      <Suspense>
        <ResetPasswordForm />
      </Suspense>
    </main>
  );
}
