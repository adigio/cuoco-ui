'use client'
export default function Modal({ isOpen, onClose, children }) {
  if (!isOpen) return null
  return (
    <div className="fixed inset-0 bg-[url('/fondo-ingredientes-signup.png')] bg-cover bg-center bg-no-repeat backdrop-blur-md bg-black/30 flex items-center justify-center z-50">
      <div className="bg-white rounded-3xl p-6 max-w-md w-full shadow-xl relative">
        {children}
        <button onClick={onClose} className="absolute top-3 right-3 text-gray-500 hover:text-black">✕</button>
      </div>
    </div>
  )
}
