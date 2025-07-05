'use client';

import React from 'react';
import {
  WeeklySchedule,
  DayOfWeek,
  MEAL_TYPES,
  CalendarRecipe,
  MealType,
  DAYS_DISPLAY,
} from '@/types';
import RecipeCard from '@/components/calendar/RecipeCard';

interface WeeklyCalendarProps {
  schedule: WeeklySchedule;
  onAddRecipe: (day: DayOfWeek, mealType: MealType) => void;
  onDeleteRecipe: (day: DayOfWeek, recipeId: number, title: string) => void;
}

export default function WeeklyCalendar({
  schedule,
  onAddRecipe,
  onDeleteRecipe,
}: WeeklyCalendarProps) {
  const getRecipeForDayAndMeal = (
    day: DayOfWeek,
    mealType: MealType
  ): CalendarRecipe | null => {
    const daySchedule = schedule.find((s) => Object.keys(s)[0] === day);
    if (!daySchedule) return null;
    const recipes = daySchedule[day];
    return recipes.find((r) => r.mealType === mealType) || null;
  };

  // Extraer los días en el orden que vienen
  const daysFromSchedule = schedule.map(
    (s) => Object.keys(s)[0] as DayOfWeek
  );

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <div className="overflow-x-auto pb-4">
        <div className="min-w-[800px] md:min-w-full">
          <div className="grid grid-cols-[60px_repeat(7,1fr)] md:grid-cols-[120px_repeat(7,1fr)] gap-4">
            {/* encabezado vacío */}
            <div className="text-center font-semibold text-gray-700 pb-2" />

            {/* Headers de los días */}
            {daysFromSchedule.map((day) => (
              <div
                key={day}
                className="text-center font-semibold text-gray-700 pb-2 text-xs md:text-base"
              >
                {DAYS_DISPLAY[day]}
              </div>
            ))}

            {/* Filas por tipo de comida */}
            {MEAL_TYPES.map((mealType) => (
              <React.Fragment key={mealType}>
                <div className="text-left text-rose-500 font-medium py-2 text-xs md:text-base">
                  {mealType}
                </div>
                {daysFromSchedule.map((day) => {
                  const recipe = getRecipeForDayAndMeal(day, mealType);
                  return (
                    <div key={`${day}-${mealType}`} className="min-h-[100px] md:min-h-[120px]">
                      <RecipeCard
                        recipe={recipe || { id: 0, title: '', image: '', mealType }}
                        isEmpty={!recipe}
                        onAdd={() => onAddRecipe(day, mealType)}
                        onDelete={recipe ? () => onDeleteRecipe(day, recipe.id, recipe.title) : undefined}
                      />
                    </div>
                  );
                })}
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
