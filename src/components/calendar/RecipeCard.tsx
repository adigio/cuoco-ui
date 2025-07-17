import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { CalendarRecipeCardProps } from '@/types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faXmark } from '@fortawesome/free-solid-svg-icons';
import { getRecipeImageUrl } from '@/utils/imageUtils';

export default function RecipeCard({ recipe, onDelete, onAdd, isEmpty = false }: CalendarRecipeCardProps) {
    const [imageSrc, setImageSrc] = useState<string>('/others/default-recipe.png');
    const [imageError, setImageError] = useState(false);

    useEffect(() => {
        if (recipe && recipe.id) {
            const url = getRecipeImageUrl(recipe);
            setImageSrc(url);
            setImageError(false);
        }
    }, [recipe]);

    if (isEmpty) {
        return (
            <div
                onClick={onAdd}
                className="h-full min-h-[110px] md:min-h-[130px] border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center cursor-pointer hover:border-color-primary-medium hover:bg-gray-50 transition-colors"
            >
                <FontAwesomeIcon
                    icon={faPlus}
                    className="text-xl md:text-2xl text-gray-400 hover:text-color-primary-medium"
                />
            </div>
        );
    }

    return (
        <div className="relative h-full">
            {onDelete && (
                <button
                    onClick={(e) => {
                        e.stopPropagation();
                        onDelete();
                    }}
                    className="absolute -top-2 -right-2 w-5 h-5 md:w-6 md:h-6 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600 transition-colors z-10"
                >
                    <FontAwesomeIcon icon={faXmark} className="text-xs md:text-sm" />
                </button>
            )}
            <div className="h-full min-h-[110px] md:min-h-[130px] p-3 md:p-2 border border-gray-200 rounded-lg hover:shadow-md transition-shadow bg-white overflow-hidden">
                <div className="flex flex-col h-full">
                    <div className="relative w-full aspect-[4/3] mb-2 flex-shrink-0">
                        <Image
                            src={!imageError ? imageSrc : '/others/default-recipe.png'}
                            alt={recipe.title || 'Receta sin título'}
                            fill
                            sizes="(max-width: 768px) 45vw, 30vw"
                            className="object-cover rounded-md"
                            priority
                            onError={() => {
                                setImageError(true);
                                setImageSrc('/others/default-recipe.png');
                            }}
                            unoptimized
                        />
                    </div>
                    <div className="flex-1 overflow-hidden">
                        <h3 className="text-[10px] md:text-xs font-medium text-gray-800 leading-tight break-words line-clamp-2">
                            {recipe.title || 'Sin título'}
                        </h3>
                    </div>
                </div>
            </div>
        </div>
    );
} 