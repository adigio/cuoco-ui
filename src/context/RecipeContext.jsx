'use client';

import { createContext, useContext, useState } from 'react';

const RecipeContext = createContext();

export const useRecipes = () => useContext(RecipeContext);

export function RecipeProvider({ children }) {
    const [filteredRecipes, setFilteredRecipes] = useState([]);

    return (
        <RecipeContext.Provider 
            value={{ filteredRecipes, setFilteredRecipes }}>
            {children}
        </RecipeContext.Provider>
    );
}