'use client';

import { useSearchParams } from 'next/navigation';

import { FORM_ID } from '@/constants/form-id';

import NavbarWithButton from '../navbar/navbar-with-button';
import { Button } from '../ui/button';

export default function RequestWriteHeader() {
  const searchParams = useSearchParams();
  const id = searchParams.get('id');

  return (
    <NavbarWithButton
      button={
        <Button
          form={FORM_ID.requestNew}
          type="submit"
        >
          {id ? '의뢰글 수정' : '의뢰글 등록'}
        </Button>
      }
    />
  );
}
