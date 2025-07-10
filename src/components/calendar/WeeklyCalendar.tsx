'use client';

import React, { useState } from 'react';
import {
  WeeklySchedule,
  DayOfWeek,
  MEAL_TYPES,
  CalendarRecipe,
  MealType,
  DAYS_DISPLAY,
  REVERSE_MEAL_TYPE_MAPPING,
  WeeklyCalendarProps,
} from '@/types';
import RecipeCard from '@/components/calendar/RecipeCard'; 
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from '@hello-pangea/dnd';
import { useCalendarStore } from '@/store/useCalendarStore';

export default function WeeklyCalendar({
  schedule,
  onAddRecipe,
  onDeleteRecipe,
  onMoveRecipe,
  onDropPendingRecipe,
}: WeeklyCalendarProps) {
  const pendingRecipe = useCalendarStore(state => state.pendingRecipe);
  const [draggingRecipe, setDraggingRecipe] = useState<CalendarRecipe | null>(null);

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

  const canDropRecipe = (mealType: MealType): boolean => {
    const slotTypeId = REVERSE_MEAL_TYPE_MAPPING[mealType];
    
    if (pendingRecipe) {
      return pendingRecipe.mealTypes.includes(slotTypeId);
    }
    
    if (draggingRecipe) {
      if (draggingRecipe.allowedMealTypes) {
        return draggingRecipe.allowedMealTypes.includes(slotTypeId);
      } else {
        return true;
      }
    }
    
    return true;
  };

  const handleDragStart = (start: any) => {
    const sourceId = start.source.droppableId;
    
    if (sourceId === 'pending-recipe') {
      return;
    }

    const [sourceDay, mealType] = sourceId.split('-') as [DayOfWeek, MealType];
    const recipe = getRecipeForDayAndMeal(sourceDay, mealType);
    
    if (recipe) {
      setDraggingRecipe(recipe);
    }
  };

  const handleDragEnd = (result: DropResult) => {
    setDraggingRecipe(null);

    if (!result.destination) return;

    const sourceId = result.source.droppableId;
    const destinationId = result.destination.droppableId;

    if (sourceId === 'pending-recipe') {
      const [destDay, destMealType] = destinationId.split('-') as [DayOfWeek, MealType];
      
      if (canDropRecipe(destMealType)) {
        onDropPendingRecipe(destDay, destMealType);
      }
      return;
    }

    const [sourceDay, mealType] = sourceId.split('-') as [DayOfWeek, MealType];
    const [destDay, destMealType] = destinationId.split('-') as [DayOfWeek, MealType];

    const recipe = getRecipeForDayAndMeal(sourceDay, mealType);
    if (recipe && draggingRecipe) {
      if (canDropRecipe(destMealType)) {
        onMoveRecipe(sourceDay, destDay, destMealType, recipe);
      }
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <DragDropContext onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
        {pendingRecipe && (
          <div className="mb-6 p-4 bg-purple-50 border-2 border-purple-200 border-dashed rounded-lg">
            <p className="text-purple-700 text-sm mb-3 text-center">
              Arrastra la receta a un slot válido
            </p>
            <Droppable droppableId="pending-recipe" direction="horizontal">
              {(provided) => (
                <div
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  className="flex justify-center"
                >
                  <Draggable draggableId="pending-recipe-item" index={0}>
                    {(providedDraggable, snapshot) => (
                      <div
                        ref={providedDraggable.innerRef}
                        {...providedDraggable.draggableProps}
                        {...providedDraggable.dragHandleProps}
                        className={`w-48 cursor-grab ${
                          snapshot.isDragging ? 'rotate-3 scale-105' : ''
                        }`}
                        style={{
                          ...providedDraggable.draggableProps.style,
                          zIndex: snapshot.isDragging ? 999999 : 'auto',
                        }}
                      >
                        <RecipeCard
                          recipe={{
                            id: pendingRecipe.id,
                            title: pendingRecipe.title,
                            image: pendingRecipe.image,
                            mealType: undefined
                          }}
                          isEmpty={false}
                        />
                      </div>
                    )}
                  </Draggable>
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </div>
        )}

        <div className="overflow-x-auto pb-4">
          <div className="min-w-[800px] md:min-w-full">
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
                  <div className="text-left font-medium py-2 text-xs md:text-base text-rose-500">
                    {mealType}
                  </div>
                  {daysFromSchedule.map((day) => {
                    const recipe = getRecipeForDayAndMeal(day, mealType);
                    const droppableId = `${day}-${mealType}`;
                    const canDrop = canDropRecipe(mealType);
                    
                    return (
                      <Droppable droppableId={droppableId} key={droppableId}>
                        {(provided, snapshot) => {
                          const isDraggedOver = snapshot.isDraggingOver;
                          
                          return (
                            <div
                              ref={provided.innerRef}
                              {...provided.droppableProps}
                              className={`h-[100px] md:h-[120px] relative transition-all ${
                                (pendingRecipe || draggingRecipe) && !canDrop
                                  ? 'opacity-50'
                                  : ''
                              } ${
                                isDraggedOver && canDrop 
                                  ? 'bg-green-100' 
                                  : isDraggedOver && !canDrop
                                  ? 'bg-red-100'
                                  : ''
                              }`}
                            >
                              <div className="absolute inset-0">
                                {recipe ? (
                                  <Draggable
                                    draggableId={`${recipe.id}-${day}-${mealType}`}
                                    index={0}
                                  >
                                    {(providedDraggable, snapshot) => (
                                      <div
                                        ref={providedDraggable.innerRef}
                                        {...providedDraggable.draggableProps}
                                        {...providedDraggable.dragHandleProps}
                                        className="h-full"
                                        style={{
                                          ...providedDraggable.draggableProps.style,
                                          zIndex: snapshot.isDragging ? 999999 : 'auto',
                                        }}
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
                              </div>
                              <div className="absolute inset-0 pointer-events-none">
                                {provided.placeholder}
                              </div>
                            </div>
                          );
                        }}
                      </Droppable>
                    );
                  })}
                </React.Fragment>
              ))}
            </div>
          </div>
        </div>
      </DragDropContext>
    </div>
  );
}
