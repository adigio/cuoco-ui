import { BRAND_COLORS } from '@/constants/colors';
import { CustomCheckboxProps } from '@/types';

export default function CustomCheckbox({
  id,
  name,
  checked,
  onChange,
  label,
  className = '',
  checkboxClassName = '',
  labelClassName = '',
  disabled = false
}: CustomCheckboxProps) {
  return (
    <label htmlFor={id} className={`flex items-center gap-2 cursor-pointer ${className}`}>
      <div className="relative">
        <input
          type="checkbox"
          id={id}
          name={name}
          checked={checked}
          onChange={onChange}
          disabled={disabled}
          className={`
            appearance-none w-5 h-5 border-2 rounded
            checked:bg-[${BRAND_COLORS.primary}] checked:border-[${BRAND_COLORS.primary}]
            focus:outline-none focus:ring-2 focus:ring-[${BRAND_COLORS.primary}] focus:ring-opacity-50
            disabled:opacity-50 disabled:cursor-not-allowed
            transition-colors
            ${checkboxClassName}
          `}
        />
        {checked && (
          <svg
            className="absolute top-0.5 left-0.5 w-4 h-4 text-white pointer-events-none"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M5 13l4 4L19 7"
            />
          </svg>
        )}
      </div>
      <span className={`select-none ${labelClassName}`}>{label}</span>
    </label>
  );
} 