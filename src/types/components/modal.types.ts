import { ReactNode } from 'react';

export interface ModalBaseProps {
  children: ReactNode;
  onClose: () => void;
}

export interface ModalProps extends ModalBaseProps {
  isOpen: boolean;
  maxWidth?: string;
  height?: string;
  padding?: string;
  containerClassName?: string;
  showCloseButton?: boolean;
}

export interface AlertModalProps extends ModalBaseProps {
  show: boolean;
  title?: string;
} 
