'use client';

import React from 'react';

/**
 * Componente Button personalizado y reutilizable
 * @param {string} type - Tipo de botón (button, submit, reset)
 * @param {function} onClick - Función para manejar clics
 * @param {React.ReactNode} children - Contenido del botón
 * @param {string} variant - Variante de color (primary, secondary, danger, success, warning, info)
 * @param {string} size - Tamaño del botón (sm, md, lg)
 * @param {string} className - Clases CSS adicionales
 * @param {boolean} fullWidth - Si el botón debe ocupar todo el ancho disponible
 * @param {boolean} disabled - Si el botón está deshabilitado
 * @param {boolean} outlined - Si el botón debe tener solo borde y ser transparente
 */
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
}) {
  // Mapa de variantes de color
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

  // Mapa de tamaños
  const sizeClasses = {
    sm: 'text-sm py-1 px-3',
    md: 'text-base py-2 px-4',
    lg: 'text-lg py-3 px-6',
  };

  // Clases base para todos los botones
  const baseClasses = 'rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2';
  
  // Clases para botones deshabilitados
  const disabledClasses = disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer';

  // Combinar todas las clases
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