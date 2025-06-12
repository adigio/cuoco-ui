// components/RecipeTags.tsx
import React from "react";

interface Recipe {
  id: string;
  title: string;
}

interface RecipeTagsProps {
  recipes: Recipe[];
}

const RecipeTags: React.FC<RecipeTagsProps> = ({ recipes }) => {
  return (
    <div className="flex flex-wrap sm:flex-nowrap justify-between items-center mb-8 gap-4">
      {/* Botones de recetas */}
      <div className="flex flex-wrap items-center gap-3">
        {recipes.map((recipe) => (
          <button
            key={recipe.id}
            className="bg-[rgba(242,127,108,0.1)] border border-[#f27f6c] text-[#f27f6c] rounded-full px-5 py-2 text-base font-medium hover:bg-[rgba(242,127,108,0.2)] transition"
          >
            {recipe.title}
          </button>
        ))}
      </div>
    </div>
  );
};

export default RecipeTags;
