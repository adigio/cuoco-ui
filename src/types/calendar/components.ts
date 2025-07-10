import { DayOfWeek, MealType, WeeklySchedule, CalendarRecipe } from './calendar.types';

export interface WeeklyCalendarProps {
  schedule: WeeklySchedule;
  onAddRecipe: (day: DayOfWeek, mealType: MealType) => void;
  onDeleteRecipe: (day: DayOfWeek, recipeId: number, title: string) => void;
  onMoveRecipe: (
    sourceDay: DayOfWeek,
    destDay: DayOfWeek,
    mealType: MealType,
    recipe: CalendarRecipe
  ) => void;
  onDropPendingRecipe: (day: DayOfWeek, mealType: MealType) => void;
}

export interface CalendarRecipeCardProps {
  recipe: CalendarRecipe;
  isEmpty: boolean;
  onAdd?: () => void;
  onDelete?: () => void;
  day?: DayOfWeek;
  mealType?: MealType;
} 