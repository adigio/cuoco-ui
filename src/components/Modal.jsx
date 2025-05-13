export default function Modal({ isOpen, onClose, children }) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center">
      <div className="bg-white rounded-2xl p-8 shadow-xl relative max-w-md w-full">
        {children}
        <button onClick={onClose} className="absolute top-3 right-4 text-gray-400 hover:text-black text-xl">&times;</button>
      </div>
    </div>
  )
}
