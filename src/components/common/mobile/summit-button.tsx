'use client';

import React from 'react';

import { Button } from '@/components/ui/button';

interface Props {
  id: string;
  positiveTitle: string;
  nagativeTitle: string;
}

const MobileSummitButton = ({ id, nagativeTitle, positiveTitle }: Props) => {
  return (
    <Button
      form={id}
      type="submit"
      size="2xl"
      className="fixed bottom-3"
    >
      {id ? positiveTitle : nagativeTitle}
    </Button>
  );
};

export default MobileSummitButton;
