import { RecipeCardProps } from '@/types/components/recipe-generator.types';
import React from 'react';
import Image from 'next/image';
import { getRecipeImageUrl } from '@/utils/imageUtils';

export default function RecipeCard({ recipe, customClass = '', children, colorFont = 'text-red-400' }: RecipeCardProps) {
    return (
        <div className={`w-[240px] bg-white rounded-xl shadow-md overflow-hidden ${customClass}`}>
            <a className="w-full" href={`/recipe/${recipe.id}`}>
                <div className="relative h-[160px] w-[240px]">
                    <Image
                        src={getRecipeImageUrl(recipe)}
                        alt={recipe.name}
                        fill
                        className="object-cover rounded-t-2xl"
                    />
                </div>
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
