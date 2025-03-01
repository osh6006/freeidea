'use client';

import { useSearchParams } from 'next/navigation';

import { FORM_ID } from '@/constants/form-id';

import NavbarWithButton from '../navbar/navbar-with-button';
import { Button } from '../ui/button';

const WorkNewNavbar = () => {
  const searchParams = useSearchParams();
  const buttonLabel = searchParams.get('id') ? '작품 수정' : '작품 등록';
  return (
    <NavbarWithButton
      button={
        <Button
          form={FORM_ID.workNew}
          type="submit"
        >
          {buttonLabel}
        </Button>
      }
    />
  );
};

export default WorkNewNavbar;
