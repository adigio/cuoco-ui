export type DayOfWeek = 'lunes' | 'martes' | 'miercoles' | 'jueves' | 'viernes' | 'sabado' | 'domingo';

export type MealType = 'Desayuno' | 'Almuerzo' | 'Cena' | 'Merienda';

export interface CalendarRecipe {
  id: number;
  title: string;
  img: string;
  mealType?: MealType;
}

export interface DaySchedule {
  [key: string]: CalendarRecipe[];
}

export type WeeklySchedule = DaySchedule[];

export const DAYS: DayOfWeek[] = ['lunes', 'martes', 'miercoles', 'jueves', 'viernes', 'sabado', 'domingo'];

export const MEAL_TYPES: MealType[] = ['Desayuno', 'Almuerzo', 'Merienda', 'Cena'];
