import { ModalProps } from '@/types/components/modal.types';

export default function Modal({
    children,
    isOpen,
    onClose,
    maxWidth = 'max-w-md',
    height = 'h-auto',
    padding = 'p-6',
    containerClassName,
}: ModalProps) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            {/* Backdrop blureado */}
            <div
                className="fixed inset-0 bg-black/30 backdrop-blur-sm"
                onClick={onClose}
            />

            {/* Contenedor del modal */}
            <div
                className={`relative z-50 w-full bg-white rounded-2xl shadow-xl ${maxWidth} ${height} ${padding} ${containerClassName}`}
            >
                {children}
            </div>
        </div>
    );
}