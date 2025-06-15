import { ModalProps } from '@/types/components/modal.types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';

export default function Modal({
    children,
    isOpen,
    onClose,
    maxWidth = 'max-w-md',
    height = 'h-auto',
    padding = 'p-6',
    containerClassName,
    showCloseButton,
}: ModalProps) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            {/* Backdrop blureado */}
            <div
                className="fixed inset-0 bg-black/30 backdrop-blur-sm"
                onClick={showCloseButton ? onClose : undefined}
            />

            {/* Contenedor del modal */}
            <div
                className={`relative z-50 w-full bg-white rounded-2xl shadow-xl ${maxWidth} ${height} ${padding} ${containerClassName}`}
            >
                {showCloseButton && (
                    <button
                        onClick={onClose}
                        className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 transition-colors"
                    >
                        <FontAwesomeIcon icon={faXmark} className="w-5 h-5" />
                    </button>
                )}
                {children}
            </div>
        </div>
    );
}