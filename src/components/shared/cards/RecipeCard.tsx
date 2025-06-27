import { RecipeCardProps } from '@/types/components/recipe-generator.types';
import React from 'react';
import Image from 'next/image';
import { getRecipeImageUrl } from '@/utils/imageUtils';

export default function RecipeCard({ recipe, customClass = '', children, colorFont = 'text-red-400' }: RecipeCardProps) {
    const cardHeight = children ? 'h-[350px]' : 'h-[280px]';
    
    return (
        <div className={`w-[240px] ${cardHeight} bg-white rounded-xl shadow-md overflow-hidden flex flex-col ${customClass}`}>
            <a className="flex-1 flex flex-col" href={`/recipe/${recipe.id}`}>
                <div className="relative h-[160px] w-[240px] flex-shrink-0">
                    <Image
                        src={getRecipeImageUrl(recipe)}
                        alt={recipe.name}
                        fill
                        className="object-cover rounded-t-2xl"
                    />
                </div>
                <div className={`p-4 flex-1 overflow-hidden ${colorFont}`}>
                    <h3 className="font-medium text-base mb-2 overflow-hidden text-ellipsis" 
                        style={{ 
                            display: '-webkit-box',
                            WebkitLineClamp: 2,
                            WebkitBoxOrient: 'vertical'
                        }}>
                        {recipe.name}
                    </h3>
                    {
                        recipe?.subtitle &&
                        <div className="text-sm overflow-hidden">
                            <p className="overflow-hidden text-ellipsis"
                               style={{ 
                                 display: '-webkit-box',
                                 WebkitLineClamp: children ? 3 : 4,
                                 WebkitBoxOrient: 'vertical'
                               }}>
                               {recipe?.subtitle}
                            </p>
                        </div>
                    }
                </div>
            </a>
            {children &&
                <div className="px-4 pb-4 pt-2">{children}</div>}
        </div>
    );
}
