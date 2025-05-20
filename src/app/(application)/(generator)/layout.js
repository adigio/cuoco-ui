// app/recipe-generator/layout.jsx
'use client';

import Container from '@/components/shared/Container';
import { IngredientProvider } from '@/context/IngredientContext';
import { RecipeProvider } from '@/context/RecipeContext';

export default function GeneratorRootLayout({ children }) {
  return (
    <IngredientProvider>
      <RecipeProvider>
       
        <Container>{children}</Container>
      </RecipeProvider>
    </IngredientProvider>
  );
}
