'use client';
import { useState } from 'react';
import { UserButton } from '@clerk/nextjs';
import Modal from '@/components/ui/modal';

const SetupPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(true);

  const closeModal = () => setIsModalOpen(false);

  return (
    <>
      <p>This is a protected route</p>
      <Modal 
        tittle='Test title' 
        description='Some desc' 
        isOpen={isModalOpen}
        onClose={closeModal}
      >
        Children
      </Modal>
    </>
  );
};

export default SetupPage;
