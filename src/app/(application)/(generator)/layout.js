// app/recipe-generator/layout.jsx
'use client';

import { IngredientProvider } from '@/context/IngredientContext';
import { RecipeProvider } from '@/context/RecipeContext';

export default function GeneratorRootLayout({ children }) {
  return (
    <IngredientProvider>
      <RecipeProvider>
        {children}
      </RecipeProvider>
    </IngredientProvider>
  );
}
