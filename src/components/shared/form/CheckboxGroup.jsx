'use client';

import React from 'react';
import Checkbox from './Checkbox';

/**
 * Componente de grupo de checkboxes personalizado y reutilizable
 * @param {string} title - Título del grupo
 * @param {array} options - Array de opciones
 * @param {array} selectedValues - Array de valores seleccionados
 * @param {function} onChange - Función para manejar cambios
 * @param {string} className - Clases CSS adicionales
 * @param {string} orientation - Orientación de los checkboxes ('horizontal' o 'vertical')
 */
export default function CheckboxGroup({
  title,
  options = [],
  selectedValues = [],
  onChange,
  className = '',
  titleClassName = '',
  checkboxGroupClassName = '',
  orientation = 'horizontal',
}) {

  // Función para manejar el cambio de un checkbox individual
  const handleCheckboxChange = (value) => {
    let newValues;
    
    if (selectedValues.includes(value)) {
      newValues = selectedValues.filter(val => val !== value);
    } else {
      newValues = [...selectedValues, value];
    }
    
    onChange(newValues);
  };

  return (
    <div className={`flex flex-col ${className}`}>
      {title && (
        <h3 className={`text-lg font-medium mb-2 text-gray-800 ${titleClassName}`}>
          {title}
        </h3>
      )}
      
      <div className={`flex ${orientation === 'horizontal' ? 'flex-wrap gap-4' : 'flex-col gap-2'} ${checkboxGroupClassName}`}>
        {options.map((option) => (
          <Checkbox
            key={option.value || option}
            id={`checkbox-${option.value || option}`}
            name={`checkbox-${option.value || option}`}
            checked={selectedValues.includes(option.value || option)}
            onChange={() => handleCheckboxChange(option.value || option)}
            label={option.label || option}
          />
        ))}
      </div>
    </div>
  );
} 