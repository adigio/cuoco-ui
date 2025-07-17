// components/RecipeTags.tsx
import React from "react";
import { useRouter } from "next/navigation";
import { MealPrepRecipeTagsProps } from "@/types";

const RecipeTags: React.FC<MealPrepRecipeTagsProps> = ({ recipes }) => {
  const router = useRouter();

  const handleRecipeClick = (recipeId: string | number) => {
    router.push(`/recipe/${recipeId}`);
  };

  return (
    <div className="flex flex-wrap sm:flex-nowrap justify-between items-center mb-8 gap-4">
      {/* Botones de recetas */}
      <div className="flex flex-wrap items-center gap-3">
        {recipes.map((recipe) => (
          <button
            key={recipe.id}
            onClick={() => handleRecipeClick(recipe.id)}
            className="bg-[rgba(242,127,108,0.1)] border border-[#f27f6c] text-[#f27f6c] rounded-full px-5 py-2 text-base font-medium hover:bg-[rgba(242,127,108,0.2)] transition cursor-pointer"
          >
            {recipe.name}
          </button>
        ))}
      </div>
    </div>
  );
};

export default RecipeTags;
