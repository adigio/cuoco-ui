'use client';

import React from 'react';
import { CheckboxProps } from '@/types/components/form.types';

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
        className="h-5 w-5 accent-purple-300"
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