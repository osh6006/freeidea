import React from 'react';

import Heading from '@/components/common/heading';
import MobileBackbutton from '@/components/common/mobile/back-button';
import RequestForm from '@/components/request/request-form';
import RequestCreateFormProvider from '@/components/request/request-form-provider';

export default function RequestWritePage({
  searchParams: { id },
}: {
  searchParams: {
    id?: string;
  };
}) {
  return (
    <>
      <div className="flex items-center gap-x-4">
        <MobileBackbutton />
        <Heading
          as="h1"
          className="typo-title-20-bold-100-tight pc-screen:typo-title-32-bold-150 pc-screen:mt-[50px]"
        >
          의뢰하기
        </Heading>
      </div>

      <RequestCreateFormProvider id={id}>
        <RequestForm />
      </RequestCreateFormProvider>
      <div className="mt-[100px] pc-screen:mt-[218px]" />
    </>
  );
}
