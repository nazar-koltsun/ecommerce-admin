'use client';
import { useEffect } from 'react';

import useStoreModal from '@/hooks/use-store-modal';

const SetupPage = () => {
  const { onOpen, isOpen } = useStoreModal();

  useEffect(() => {
    if(!isOpen) {
      onOpen();
    }
  }, [isOpen, onOpen]);

  return (
    <>
      <p>This is a protected route</p>
    </>
  );
};

export default SetupPage;
