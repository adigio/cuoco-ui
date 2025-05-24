'use client';

import React from 'react';

// TODO: cambiarlo a types
interface CheckboxProps {
  id?: string;
  name: string;
  checked: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  label: string;
  className?: string;
  labelClassName?: string;
  checkboxClassName?: string;
  disabled?: boolean;
}

export default function Checkbox({
  id,
  name,
  checked,
  onChange,
  label,
  className = '',
  labelClassName = '',
  checkboxClassName = '',
  disabled = false,
}: CheckboxProps) {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <input
        type="checkbox"
        id={id || name}
        name={name}
        checked={checked}
        onChange={onChange}
        disabled={disabled}
        className={`w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500 ${
          disabled ? 'opacity-60 cursor-not-allowed' : 'cursor-pointer'
        } ${checkboxClassName}`}
      />
      {label && (
        <label 
          htmlFor={id || name} 
          className={`text-sm select-none ${
            disabled ? 'text-gray-500 cursor-not-allowed' : 'text-gray-700 cursor-pointer'
          } ${labelClassName}`}
        >
          {label}
        </label>
      )}
    </div>
  );
} 