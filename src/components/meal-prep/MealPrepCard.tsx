'use client';

import { MealPrep } from "@/types";
import React, { ReactNode } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import Link from "next/link";

interface Props {
  mealPrep: MealPrep;
  onClick?: () => void;
  children?: ReactNode;
}

export default function MealPrepCard({ mealPrep, onClick, children }: Props) {
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

      <Link href={`/meal-prep/${mealPrep.id}`}>
        <div className="flex flex-col sm:flex-row gap-4">
          {Array.isArray(mealPrep.recipes) && mealPrep.recipes.slice(0, 3).map((recipe) => (
            <div
              key={recipe.id}
              className="flex-1 bg-gray-100 rounded p-3 flex flex-col items-start"
            >
              {recipe.image && (
                <div className="w-full relative h-32">
                  <Image
                    src={recipe.image}
                    alt={recipe.title}
                    fill
                    className="object-cover rounded"
                  />
                </div>
              )}
              <h4 className="font-semibold text-md">{recipe.title}</h4>
            </div>
          ))}
        </div>
      </Link>

      {children &&
        <div className="p-4" onClick={e => e.stopPropagation()}>{children}</div>}
    </div>
  );
}
