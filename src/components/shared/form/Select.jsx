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
}) {
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
        className={`p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none ${
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