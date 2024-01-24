import { ReactNode } from 'react';
import { createPortal } from 'react-dom';
import { Icon } from 'src/ui/common/Icon';
import icons from 'src/ui/common/Icon/iconPaths';

interface ModalProps {
  className?: string;
  children: ReactNode;
  isOpen?: boolean;
  onClose?: (...args: any[]) => void;
}

export function Modal({ className = '', children, isOpen = true, onClose }: ModalProps) {
  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (e.target === e.currentTarget) {
      onClose?.();
    }
  };

  return createPortal(
    <div
      className={
        isOpen
          ? 'fixed inset-0 flex items-center justify-center bg-black-1 bg-opacity-20'
          : 'hidden'
      }
      onClick={handleBackdropClick}
    >
      <div className={`relative p-12 bg-white rounded-2xl ${className}`}>
        <button className='absolute w-auto p-2 rounded-full top-2 right-2' onClick={onClose}>
          <Icon src={icons.close} alt='close' iconColor='icon' />
        </button>
        {children}
      </div>
    </div>,
    document.body,
  );
}
