'use client';
import Modal from "@/components/ui/modal";
import useStoreModal from "@/hooks/use-store-modal";

const StoreModal = () => {
  const { isOpen, onClose } = useStoreModal();

  return (
    <Modal isOpen={isOpen} onClose={onClose} tittle="Store" description="Store description">
      Create store form will be here
    </Modal>
  )
}

export default StoreModal;