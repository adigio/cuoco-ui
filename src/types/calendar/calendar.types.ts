export type DayOfWeek = 'lunes' | 'martes' | 'miercoles' | 'jueves' | 'viernes' | 'sabado' | 'domingo';

export type MealType = 'Desayuno' | 'Almuerzo' | 'Cena' | 'Merienda';

// Frontend types
export interface CalendarRecipe {
  id: number;
  title: string;
  image: string;
  mealType?: MealType;
  allowedMealTypes?: number[]; // IDs de los meal types permitidos para esta receta
}

export interface DaySchedule {
  [key: string]: CalendarRecipe[];
}

export type WeeklySchedule = DaySchedule[];

// Backend types
export interface BackendRecipe {
  id: number;
  name: string;
  image: string;
  meal_types: Array<{
    id: number;
    description: string;
  }>;
}

export interface BackendMealType {
  id: number;
  description: string;
}

export interface BackendDay {
  id: number;
  description: string;
}

export interface BackendScheduleDay {
  day: BackendDay;
  recipes: Array<{
    recipe: BackendRecipe;
    meal_type: BackendMealType;
  }>;
}

export type BackendWeeklySchedule = BackendScheduleDay[];

// Save types for backend
export interface SaveRecipePayload {
  recipeId: number;
  mealTypeId: number;
}

export interface SaveDaySchedulePayload {
  dayId: number;
  recipes: SaveRecipePayload[];
}

export type SaveWeeklySchedulePayload = SaveDaySchedulePayload[];

// Constants and mappings
export const DAYS: DayOfWeek[] = ['lunes', 'martes', 'miercoles', 'jueves', 'viernes', 'sabado', 'domingo'];

export const DAYS_DISPLAY: Record<DayOfWeek, string> = {
  'lunes': 'Lunes',
  'martes': 'Martes',
  'miercoles': 'Miércoles',
  'jueves': 'Jueves',
  'viernes': 'Viernes',
  'sabado': 'Sábado',
  'domingo': 'Domingo'
};

export const MEAL_TYPES: MealType[] = ['Desayuno', 'Almuerzo', 'Merienda', 'Cena'];

export const DAY_MAPPING: Record<number, DayOfWeek> = {
  1: 'lunes',
  2: 'martes',
  3: 'miercoles',
  4: 'jueves',
  5: 'viernes',
  6: 'sabado',
  7: 'domingo'
};

export const MEAL_TYPE_MAPPING: Record<number, MealType> = {
  1: 'Desayuno',
  2: 'Almuerzo',
  3: 'Merienda',
  4: 'Cena'
};

export const REVERSE_DAY_MAPPING: Record<DayOfWeek, number> = Object.entries(DAY_MAPPING)
  .reduce((acc, [key, value]) => ({ ...acc, [value]: Number(key) }), {} as Record<DayOfWeek, number>);

export const REVERSE_MEAL_TYPE_MAPPING: Record<MealType, number> = Object.entries(MEAL_TYPE_MAPPING)
  .reduce((acc, [key, value]) => ({ ...acc, [value]: Number(key) }), {} as Record<MealType, number>);

