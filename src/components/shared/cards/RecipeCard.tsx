import React, { ReactNode } from 'react';
import { Recipe } from '@/types/recipe.types';

interface RecipeCardProps {
  recipe: Recipe;
  customClass?: string;
  children?: ReactNode;
  colorFont?: string;
}

export default function RecipeCard({ recipe, customClass = '', children, colorFont = 'text-red-400' }: RecipeCardProps) {
    return (
        <div className={`w-[240px] bg-white rounded-xl shadow-md overflow-hidden ${customClass}`}>
            <a className="w-full" href={`/recipe/${recipe.id}`}>
                <img
                    src={recipe.image}
                    alt={recipe.name}
                    width={240}
                    height={160}
                    className="object-cover rounded-t-2xl h-[160px] w-[240px]"
                />
                <div className={`p-4 ${colorFont}`}>
                    <h3 className="font-medium text-base mb-2">{recipe.name}</h3>
                    {
                        recipe?.subtitle &&
                        <div className=" text-sm flex items-center gap-1">
                            <p>{recipe?.subtitle}</p>
                        </div>
                    }
                </div>
            </a>
            {children &&
                <div className="p-4">{children}</div>} 
        </div>
    );
}
