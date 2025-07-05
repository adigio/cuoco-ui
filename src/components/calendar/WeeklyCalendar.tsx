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
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from '@hello-pangea/dnd';

interface WeeklyCalendarProps {
  schedule: WeeklySchedule;
  onAddRecipe: (day: DayOfWeek, mealType: MealType) => void;
  onDeleteRecipe: (day: DayOfWeek, recipeId: number, title: string) => void;
  onMoveRecipe: (
    sourceDay: DayOfWeek,
    destDay: DayOfWeek,
    mealType: MealType,
    recipe: CalendarRecipe
  ) => void;
}

export default function WeeklyCalendar({
  schedule,
  onAddRecipe,
  onDeleteRecipe,
  onMoveRecipe,
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

  const daysFromSchedule = schedule.map(
    (s) => Object.keys(s)[0] as DayOfWeek
  );

  const handleDragEnd = (result: DropResult) => {
    if (!result.destination) return;

    const [sourceDay, mealType] = result.source.droppableId.split(
      '-'
    ) as [DayOfWeek, MealType];
    const [destDay] = result.destination.droppableId.split(
      '-'
    ) as [DayOfWeek];

    const recipe = getRecipeForDayAndMeal(sourceDay, mealType);
    if (recipe) {
      onMoveRecipe(sourceDay, destDay, mealType, recipe);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <div className="overflow-x-auto pb-4">
        <div className="min-w-[800px] md:min-w-full">
          <DragDropContext onDragEnd={handleDragEnd}>
            <div className="grid grid-cols-[60px_repeat(7,1fr)] md:grid-cols-[120px_repeat(7,1fr)] gap-4">
              <div className="text-center font-semibold text-gray-700 pb-2" />
              {daysFromSchedule.map((day) => (
                <div
                  key={day}
                  className="text-center font-semibold text-gray-700 pb-2 text-xs md:text-base"
                >
                  {DAYS_DISPLAY[day]}
                </div>
              ))}

              {MEAL_TYPES.map((mealType) => (
                <React.Fragment key={mealType}>
                  <div className="text-left text-rose-500 font-medium py-2 text-xs md:text-base">
                    {mealType}
                  </div>
                  {daysFromSchedule.map((day) => {
                    const recipe = getRecipeForDayAndMeal(day, mealType);
                    const droppableId = `${day}-${mealType}`;
                    return (
                      <Droppable droppableId={droppableId} key={droppableId}>
                        {(provided) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.droppableProps}
                            className="min-h-[100px] md:min-h-[120px]"
                          >
                            {recipe ? (
                              <Draggable
                                draggableId={`${recipe.id}-${day}-${mealType}`}
                                index={0}
                              >
                                {(providedDraggable) => (
                                  <div
                                    ref={providedDraggable.innerRef}
                                    {...providedDraggable.draggableProps}
                                    {...providedDraggable.dragHandleProps}
                                  >
                                    <RecipeCard
                                      recipe={recipe}
                                      isEmpty={false}
                                      onAdd={() => onAddRecipe(day, mealType)}
                                      onDelete={() =>
                                        onDeleteRecipe(day, recipe.id, recipe.title)
                                      }
                                    />
                                  </div>
                                )}
                              </Draggable>
                            ) : (
                              <RecipeCard
                                recipe={{
                                  id: 0,
                                  title: '',
                                  image: '',
                                  mealType,
                                }}
                                isEmpty
                                onAdd={() => onAddRecipe(day, mealType)}
                              />
                            )}
                            {provided.placeholder}
                          </div>
                        )}
                      </Droppable>
                    );
                  })}
                </React.Fragment>
              ))}
            </div>
          </DragDropContext>
        </div>
      </div>
    </div>
  );
}
