'use client'
import { ModalProps } from '@/types'


export default function Modal({ isOpen, onClose, children }: ModalProps) {
  if (!isOpen) return null
  return (
    <div className="fixed inset-0 bg-[url('/fondo-ingredientes-signup.png')] bg-cover bg-center bg-no-repeat backdrop-blur-md bg-black/30 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-3xl p-6 w-full max-w-md h-[68vh] overflow-y-auto shadow-xl relative">
        {children}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-black"
          aria-label="Cerrar modal"
        >
          ✕
        </button>
      </div>
    </div>
  )
}
