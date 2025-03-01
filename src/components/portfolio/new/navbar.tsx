'use client';

import { useFormContext } from 'react-hook-form';

import { FORM_ID } from '@/constants/form-id';

import { useEditorContext } from '../../common/editor/editor-provider';
import Toolbar from '../../common/editor/toolbar';
import NavbarWithButton from '../../navbar/navbar-with-button';
import { Button } from '../../ui/button';

function PortfolioWriteNavbar({ mode }: { mode: 'write' | 'update' }) {
  const editor = useEditorContext();
  const { formState } = useFormContext();

  return (
    <NavbarWithButton
      center={
        <Toolbar
          className=" px-[34px] justify-between gap-0"
          editor={editor}
          excludeButtons={['Youtube', 'Image']}
        />
      }
      button={
        <Button
          type="submit"
          form={FORM_ID.portfolioWrite}
          disabled={formState.isSubmitting}
        >
          {mode === 'write' ? '작품 등록' : '작품 수정'}
        </Button>
      }
    />
  );
}

export default PortfolioWriteNavbar;
