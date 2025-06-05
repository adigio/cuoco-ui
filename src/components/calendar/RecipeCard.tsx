import React from 'react';
import Image from 'next/image';
import { CalendarRecipe } from '@/types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faXmark } from '@fortawesome/free-solid-svg-icons';

interface RecipeCardProps {
    recipe: CalendarRecipe;
    onDelete?: () => void;
    onAdd?: () => void;
    isEmpty?: boolean;
}

export default function RecipeCard({ recipe, onDelete, onAdd, isEmpty = false }: RecipeCardProps) {
    if (isEmpty) {
        return (
            <div
                onClick={onAdd}
                className="h-full min-h-[120px] border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center cursor-pointer hover:border-color-primary-medium hover:bg-gray-50 transition-colors"
            >
                <FontAwesomeIcon
                    icon={faPlus}
                    className="text-2xl text-gray-400 hover:text-color-primary-medium"
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
                    className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600 transition-colors z-10"
                >
                    <FontAwesomeIcon icon={faXmark} className="text-sm" />
                </button>
            )}
            <div className="h-full p-3 border border-gray-200 rounded-lg hover:shadow-md transition-shadow">
                <div className="flex flex-col h-full">
                    {recipe.img && (
                        <div className="relative w-full h-16 mb-2">
                            <Image
                                src={recipe.img || '/images/default-recipe.jpg'}
                                alt={recipe.title || 'Receta sin título'}
                                fill
                                className="object-cover rounded"
                            />
                        </div>
                    )}
                    <h3 className="text-sm font-medium text-gray-800 line-clamp-2">
                        {recipe.title || 'Sin título'}
                    </h3>
                </div>
            </div>
        </div>
    );
} 