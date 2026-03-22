import { useModalStore } from '@shared/lib/store';
import type { ReactNode } from 'react';
import { createPortal } from 'react-dom';

type TProps = {
  children: ReactNode;
  onClose?: () => void;
};

export const Modal = ({ children, onClose }: TProps) => {
  const { isOpen, onClose: storeOnClose } = useModalStore();

  const handleClose = onClose || storeOnClose;

  if (!isOpen) return null;

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      handleClose();
    }
  };

  return createPortal(
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
      onClick={handleBackdropClick}
    >
      {children}
    </div>,
    document.body
  );
};
