// app/recipe-generator/layout.jsx
'use client';

import { IngredientProvider } from '@/context/IngredientContext';

export default function RecipeGeneratorLayout({ children }) {
  return (
    <IngredientProvider>
      {children}
    </IngredientProvider>
  );
}
