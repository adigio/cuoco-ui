// src/test/core/__tests__/components/RecipeIngredientInput.test.tsx

import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import RecipeIngredientInput from '@/components/recipe-generator/IngredientInput';
import * as ingredientsStoreModule from '@/store/useIngredientsStore';

jest.mock('@/store/useIngredientsStore');

describe('RecipeIngredientInput', () => {
  let addIngredientMock: jest.Mock;

  beforeEach(() => {
    jest.clearAllMocks();
    // Creamos el mock de addIngredient
    addIngredientMock = jest.fn().mockReturnValue(true);
    // Spy del hook para devolver nuestra implementación
    jest
      .spyOn(ingredientsStoreModule, 'useIngredientsStore')
      .mockImplementation((selector) =>
        selector({ addIngredient: addIngredientMock } as any)
      );
  });

  it('llama a addIngredient y limpia el input al hacer click en +', () => {
    render(<RecipeIngredientInput />);

    const input = screen.getByPlaceholderText('Ej: Leche, Huevos...') as HTMLInputElement;
    fireEvent.change(input, { target: { value: 'Leche' } });

    const addButton = screen.getByTitle('Agregar ingrediente');
    fireEvent.click(addButton);

    expect(addIngredientMock).toHaveBeenCalledWith('Leche', 'manual', true);
    expect(input.value).toBe('');
  });

  it('llama a addIngredient y limpia el input al presionar Enter', () => {
    render(<RecipeIngredientInput />);

    const input = screen.getByPlaceholderText('Ej: Leche, Huevos...') as HTMLInputElement;
    fireEvent.change(input, { target: { value: 'Huevos' } });

    fireEvent.keyDown(input, { key: 'Enter', code: 'Enter' });

    expect(addIngredientMock).toHaveBeenCalledWith('Huevos', 'manual', true);
    expect(input.value).toBe('');
  });

  it('no limpia el input si addIngredient devuelve false', () => {
    // Forzamos que el mock devuelva false
    addIngredientMock.mockReturnValueOnce(false);
    render(<RecipeIngredientInput />);

    const input = screen.getByPlaceholderText('Ej: Leche, Huevos...') as HTMLInputElement;
    fireEvent.change(input, { target: { value: 'Harina' } });

    const addButton = screen.getByTitle('Agregar ingrediente');
    fireEvent.click(addButton);

    expect(addIngredientMock).toHaveBeenCalledWith('Harina', 'manual', true);
    expect(input.value).toBe('Harina');
  });

  it('muestra y funciona el botón de limpiar input', () => {
    render(<RecipeIngredientInput />);

    const input = screen.getByPlaceholderText('Ej: Leche, Huevos...') as HTMLInputElement;
    fireEvent.change(input, { target: { value: 'Azúcar' } });

    const clearButton = screen.getByTitle('Eliminar');
    expect(clearButton).toBeInTheDocument();

    fireEvent.click(clearButton);
    expect(input.value).toBe('');
  });
});
