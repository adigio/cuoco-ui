'use client';

import React from 'react';
import { InputProps } from '@/types/components/form.types';

/**
 * Componente Input personalizado y reutilizable
 * @param {string} type - Tipo de input (text, number, email, password, etc.)
 * @param {string} name - Nombre del input
 * @param {string|number} value - Valor del input
 * @param {function} onChange - Función para manejar cambios
 * @param {string} label - Etiqueta del input
 * @param {string} placeholder - Placeholder del input
 * @param {string} className - Clases CSS adicionales para el contenedor
 * @param {string} inputClassName - Clases CSS adicionales para el input
 * @param {string} labelClassName - Clases CSS adicionales para la etiqueta
 * @param {boolean} required - Si el campo es requerido
 * @param {boolean} disabled - Si el campo está deshabilitado
 * @param {number} min - Valor mínimo (para inputs numéricos)
 * @param {number} max - Valor máximo (para inputs numéricos)
 */

export default function Input({
  type = 'text',
  name,
  value,
  onChange,
  label = '',
  placeholder = '',
  className = '',
  inputClassName = '',
  labelClassName = '',
  required = false,
  disabled = false,
  min,
  max,
  ...props
}: InputProps) {
  return (
    <div className={`flex flex-col ${className}`}>
      {label && (
        <label 
          htmlFor={name} 
          className={`text-sm font-medium mb-1 text-gray-700 ${labelClassName}`}
        >
          {label} {required && <span className="text-gray-200">*</span>}
        </label>
      )}
      <input
        type={type}
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        disabled={disabled}
        min={min}
        max={max}
        className={`px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-100 focus:border-purple-100${
          disabled ? 'bg-gray-100 cursor-not-allowed' : ''
        } ${inputClassName}`}
        {...props}
      />
    </div>
  );
} 