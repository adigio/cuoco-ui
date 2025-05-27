import { ReactNode } from 'react';

export interface ModalBaseProps {
  children: ReactNode;
  onClose: () => void;
}

export interface ModalProps extends ModalBaseProps {
  isOpen: boolean;
}

export interface AlertModalProps extends ModalBaseProps {
  show: boolean;
  title?: string;
} 