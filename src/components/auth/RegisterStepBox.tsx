import { ReactNode } from 'react'; 
import { RegisterStepBoxProps } from "@/types/components/register-steppers.types"; 

export default function RegisterStepBox({
  icon: Icon,
  title,
  description,
  buttonText,
  onClick,
  disabled,
  completed,
  color = '#F5807B',
}: RegisterStepBoxProps) {
  const textCompleted = 'text-white'

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`group w-full flex justify-between items-center p-4 rounded-xl shadow-md transition-colors duration-200
        ${completed ? textCompleted : 'bg-white hover:bg-transparent'}
      `}
      style={{
        backgroundColor: completed ? color : '',
        '--hover-color': color
      } as React.CSSProperties}
      onMouseEnter={(e) => {
        if (!completed) {
          (e.currentTarget as HTMLElement).style.backgroundColor = color;
        }
      }}
      onMouseLeave={(e) => {
        if (!completed) {
          (e.currentTarget as HTMLElement).style.backgroundColor = '';
        }
      }}
    >
    <div className="flex items-center gap-3">
        <Icon className={`w-6 h-6 transition-colors duration-200 ${completed ? 'text-white' : 'text-gray-700 group-hover:text-white'}`}/>
        <div className="text-left">
          <h3 className={`font-semibold transition-colors duration-200 ${completed ? 'text-white' : 'text-gray-800 group-hover:text-white'}`}>{title}</h3>
          <p className={`text-sm transition-colors duration-200 ${completed ? 'text-white' : 'text-gray-500 group-hover:text-white'}`}>{description}</p>
        </div>
    </div>

    <span 
      className={`px-4 py-1 rounded text-sm font-semibold shadow transition-colors duration-200 ${completed ? 'bg-white' : 'text-white group-hover:bg-white'}`}
      style={{
        color: completed ? color : '',
        backgroundColor: completed ? '' : color
      }}
    >
      {completed ? '✓' : buttonText}
    </span>
    
    </button>
  )
}

