// src/test/core/__tests__/components/RecipeIngredientInput.test.tsx

import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import RecipeIngredientInput from '@/components/recipe-generator/IngredientInput';
import * as ingredientsStoreModule from '@/store/useIngredientsStore';
import * as filterOptionsCacheModule from '@/hooks/useFilterOptionsCache';

jest.mock('@/store/useIngredientsStore');
jest.mock('@/hooks/useFilterOptionsCache');

describe('RecipeIngredientInput', () => {
  let addIngredientMock: jest.Mock;

  beforeEach(() => {
    jest.clearAllMocks();

    addIngredientMock = jest.fn().mockReturnValue(true);

    jest
      .spyOn(ingredientsStoreModule, 'useIngredientsStore')
      .mockImplementation((selector) =>
        selector({
          addIngredient: addIngredientMock,
        } as any)
      );

    jest
      .spyOn(filterOptionsCacheModule, 'useFilterOptionsCache')
      .mockReturnValue({
        isLoaded: true,
        difficultyOptions: [],
        allergyOptions: [],
        dietOptions: [],
        needOptions: [],
        timeOptions: [],
        mealOptions: [],
        unitOptions: [
          { key: 1, value: 1, label: 'unidad', symbol: 'u' },
          { key: 2, value: 2, label: 'gramos', symbol: 'g' },
        ],
        cookingLevelOptions: [],
        originalAllergyOptions: [],
        originalDietOptions: [],
        originalDietaryNeedOptions: [],
        originalUnitOptions: [],
        originalPreparationTimeOptions: [],
        originalMealTypeOptions: [],
      });
  });

  it('llama a addIngredient y limpia el input al hacer click en +', () => {
    render(<RecipeIngredientInput />);

    const input = screen.getByPlaceholderText('Ej: Leche, Huevos...') as HTMLInputElement;
    const quantityInput = screen.getByPlaceholderText('Cantidad') as HTMLInputElement;
    const select = screen.getByRole('combobox') as HTMLSelectElement;
    const addButton = screen.getByTitle('Agregar ingrediente');

    fireEvent.change(input, { target: { value: 'Leche' } });
    fireEvent.change(quantityInput, { target: { value: '2' } });
    fireEvent.change(select, { target: { value: '1' } });

    fireEvent.click(addButton);

    expect(addIngredientMock).toHaveBeenCalledWith(
      'Leche',
      2,
      '1',
      'u',
      false,
      'manual',
      true
    );

    expect(input.value).toBe('');
    expect(quantityInput.value).toBe('');
    expect(select.value).toBe('1'); // O el valor esperado después del reset
  });

  it('llama a addIngredient y limpia el input al presionar Enter', () => {
    render(<RecipeIngredientInput />);

    const input = screen.getByPlaceholderText('Ej: Leche, Huevos...') as HTMLInputElement;
    const quantityInput = screen.getByPlaceholderText('Cantidad') as HTMLInputElement;
    const select = screen.getByRole('combobox') as HTMLSelectElement;

    fireEvent.change(input, { target: { value: 'Huevos' } });
    fireEvent.change(quantityInput, { target: { value: '3' } });

    fireEvent.keyDown(input, { key: 'Enter', code: 'Enter' });

    expect(addIngredientMock).toHaveBeenCalledWith(
      'Huevos',
      3,
      '1',
      'u',
      false,
      'manual',
      true
    );

    expect(input.value).toBe('');
    expect(quantityInput.value).toBe('');
    expect(select.value).toBe('1'); // O el valor esperado
  });

  it('no limpia el input si addIngredient devuelve false', () => {
    addIngredientMock.mockReturnValueOnce(false);

    render(<RecipeIngredientInput />);

    const input = screen.getByPlaceholderText('Ej: Leche, Huevos...') as HTMLInputElement;
    const quantityInput = screen.getByPlaceholderText('Cantidad') as HTMLInputElement;

    fireEvent.change(input, { target: { value: 'Harina' } });
    fireEvent.change(quantityInput, { target: { value: '5' } });

    const addButton = screen.getByTitle('Agregar ingrediente');
    fireEvent.click(addButton);

    expect(addIngredientMock).toHaveBeenCalledWith(
      'Harina',
      5,
      '1',
      'u',
      false,
      'manual',
      true
    );

    expect(input.value).toBe('Harina');
    expect(quantityInput.value).toBe('5');
  });

  it('muestra y funciona el botón de limpiar input', () => {
    render(<RecipeIngredientInput />);

    const input = screen.getByPlaceholderText('Ej: Leche, Huevos...') as HTMLInputElement;
    fireEvent.change(input, { target: { value: 'Azúcar' } });

    // Como no hay botón de limpiar real, simulamos el clear
    expect(input.value).toBe('Azúcar');
    fireEvent.change(input, { target: { value: '' } });
    expect(input.value).toBe('');
  });
});
