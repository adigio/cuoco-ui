'use client';

import React from 'react';
import { ButtonProps } from '@/types/components/form.types';

export default function Button({
  type = 'button',
  onClick,
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  fullWidth = false,
  disabled = false,
  outlined = false,
  ...props
}: ButtonProps) {
  const variantClasses = {
    primary: outlined
      ? 'border border-[#f37b6a] text-[#f37b6a] hover:bg-[#f37b6a]/10'
      : 'bg-[#f37b6a] text-white hover:bg-[#e36455]',
    secondary: outlined
      ? 'border border-gray-300 text-gray-700 hover:bg-gray-100'
      : 'bg-gray-200 text-gray-800 hover:bg-gray-300',
    danger: outlined
      ? 'border border-red-600 text-red-600 hover:bg-red-50'
      : 'bg-red-600 text-white hover:bg-red-700',
    success: outlined
      ? 'border border-green-600 text-green-600 hover:bg-green-50'
      : 'bg-green-600 text-white hover:bg-green-700',
    purple: outlined
      ? 'border border-purple-600 text-purple-600 hover:bg-purple-50'
      : 'bg-purple-600 text-white hover:bg-purple-700',
    facebook: outlined
      ? 'border border-blue-800 text-blue-800 hover:bg-blue-50'
      : 'bg-blue-800 text-white hover:bg-blue-900',
    google: outlined
      ? 'border border-red-600 text-red-600 hover:bg-red-50'
      : 'bg-red-600 text-white hover:bg-red-700',
  };

  const sizeClasses = {
    sm: 'text-sm py-1 px-3',
    md: 'text-base py-2 px-4',
    lg: 'text-lg py-3 px-6',
  };

  const baseClasses =
    'rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2';

  const disabledClasses = disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer';

  const buttonClasses = `
    ${baseClasses}
    ${variantClasses[variant] || variantClasses.primary}
    ${sizeClasses[size] || sizeClasses.md}
    ${fullWidth ? 'w-full' : ''}
    ${disabledClasses}
    ${className}
  `.trim();

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={buttonClasses}
      {...props}
    >
      {children}
    </button>
  );
}