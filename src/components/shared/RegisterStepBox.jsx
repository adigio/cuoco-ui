export default function RegisterStepBox({
  icon: Icon,
  title,
  description,
  buttonText,
  onClick,
  disabled,
  completed,
}) {

    const baseColor = '#F5807B' // color rosa
    const bgCompleted = 'bg-[#F5807B]'
    const textCompleted = 'text-white'

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`group w-full flex justify-between items-center p-4 rounded-xl shadow-md transition-colors duration-200
        ${completed ? `${bgCompleted} ${textCompleted}` : 'bg-white hover:bg-[#F5807B]'}
      `}
    >
    <div className="flex items-center gap-3">
        <Icon className={`w-6 h-6 transition-colors duration-200 ${completed ? 'text-white' : 'text-gray-700 group-hover:text-white'}`}/>
        <div className="text-left">
          <h3 className={`font-semibold transition-colors duration-200 ${completed ? 'text-white' : 'text-gray-800 group-hover:text-white'}`}>{title}</h3>
          <p className={`text-sm transition-colors duration-200 ${completed ? 'text-white' : 'text-gray-500 group-hover:text-white'}`}>{description}</p>
        </div>
    </div>

    <span className={`px-4 py-1 rounded-lg text-sm font-semibold shadow transition-colors duration-200 ${completed ? 'bg-white text-[#F5807B]' : 'bg-[#F5807B] text-white group-hover:bg-white group-hover:text-[#F5807B]'}`}>{completed ? '✓' : buttonText}</span>
    
    </button>
  )
}

