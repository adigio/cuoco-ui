'use client';

import React from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import Link from "next/link";
import { getRecipeImageUrl } from '@/utils/imageUtils';
import { MealPrepCardProps } from "@/types";

export default function MealPrepCard({ mealPrep, onClick, children }: MealPrepCardProps) {
  const router = useRouter();

  const handleClick = () => {
    if (onClick) {
      onClick();
    } else {
      router.push(`/meal-prep/${mealPrep.id}`);
    }
  };

  return (
    <div
      className="cursor-pointer w-full bg-white shadow-md rounded-lg p-4 mb-6 hover:shadow-lg transition"
      onClick={handleClick}
    >
      <h3 className="text-xl font-bold mb-2">{mealPrep.title}</h3>

      <Link href={`/meal-preps/${mealPrep.id}`}>
        <div className="flex flex-col sm:flex-row gap-4">
          {Array.isArray(mealPrep.recipes) && mealPrep.recipes.slice(0, 3).map((recipe) => (
            <div
              key={recipe.id}
              className="flex-1 bg-gray-100 rounded p-3 flex flex-col items-start"
            >
              {recipe.image && (
                <div className="w-full relative h-32">
                  <Image
                    src={getRecipeImageUrl(recipe)}
                    alt={recipe.name}
                    fill
                    className="object-cover rounded"
                    unoptimized
                  />
                </div>
              )}
              <h4 className="font-semibold text-md mt-3">{recipe.name}</h4>
            </div>
          ))}
        </div>
      </Link>

      {children &&
        <div className="mt-2 p-4" onClick={e => e.stopPropagation()}>{children}</div>}
    </div>
  );
}
