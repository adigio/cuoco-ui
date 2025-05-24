'use client';

import React from 'react';

/**
 * Componente Select personalizado y reutilizable
 * @param {string} name - Nombre del select
 * @param {string} value - Valor seleccionado
 * @param {function} onChange - Función para manejar cambios
 * @param {array} options - Array de opciones [{value: 'valor', label: 'Etiqueta'}]
 * @param {string} label - Etiqueta del select
 * @param {string} placeholder - Texto para la opción por defecto
 * @param {string} className - Clases CSS adicionales
 * @param {boolean} required - Si el campo es requerido
 * @param {boolean} disabled - Si el campo está deshabilitado
 */

// TODO: cambiarlo a types
interface SelectProps {
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  options: { value: string; label: string }[];
  label?: string;
  placeholder?: string;
  className?: string;
  labelClassName?: string;
  selectClassName?: string;
  required?: boolean;
  disabled?: boolean;
}
export default function Select({
  name,
  value,
  onChange,
  options = [],
  label = '',
  placeholder = 'Seleccionar',
  className = '',
  labelClassName = '',
  selectClassName = '',
  required = false,
  disabled = false,
}: SelectProps) {
  return (
    <div className={`flex flex-col ${className}`}>
      {label && (
        <label 
          htmlFor={name} 
          className={`text-sm font-medium mb-1 text-gray-700 ${labelClassName}`}
        >
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      )}
      <select
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        disabled={disabled}
        required={required}
        className={`px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-100 outline-none ${
          disabled ? 'bg-gray-100 cursor-not-allowed' : ''
        } ${selectClassName}`}
      >
        {placeholder && <option value="">{placeholder}</option>}
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
} 