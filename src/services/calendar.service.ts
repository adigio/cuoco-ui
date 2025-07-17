import {
    WeeklySchedule,
    BackendWeeklySchedule,
    CalendarRecipe,
    MEAL_TYPES,
    MealType,
    DayOfWeek,
    DAYS,
    REVERSE_DAY_MAPPING,
    REVERSE_MEAL_TYPE_MAPPING,
    SaveWeeklySchedulePayload,
    SaveRecipePayload,
    SaveDaySchedulePayload
} from '@/types';
import apiClient from '@/lib/axios.config';

const getCurrentDayInSpanish = (): DayOfWeek => {
    const currentDay = new Date().getDay();
    const adjustedDay = currentDay === 0 ? 7 : currentDay;
    return DAYS[adjustedDay - 1];
};

const createEmptyWeekSchedule = (): WeeklySchedule => {
    const currentDay = getCurrentDayInSpanish();
    const currentDayIndex = DAYS.indexOf(currentDay);
    const reorderedDays = [
        ...DAYS.slice(currentDayIndex),
        ...DAYS.slice(0, currentDayIndex)
    ];
    return reorderedDays.map(day => ({ [day]: [] }));
};

const normalizeDay = (day: string): DayOfWeek => {
    const normalizations: Record<string, DayOfWeek> = {
        'Domingo': 'domingo',
        'Lunes': 'lunes',
        'Martes': 'martes',
        'Miércoles': 'miercoles',
        'Miercoles': 'miercoles',
        'Jueves': 'jueves',
        'Viernes': 'viernes',
        'Sábado': 'sabado',
        'Sabado': 'sabado'
    };
    return normalizations[day] || day as DayOfWeek;
};

const normalizeMealType = (mealType: string): MealType => {
    const cleaned = mealType.toLowerCase();
    switch(cleaned) {
        case 'desayuno': return 'Desayuno';
        case 'almuerzo': return 'Almuerzo';
        case 'merienda': return 'Merienda';
        case 'cena': return 'Cena';
        default: return mealType as MealType;
    }
};

const createRecipeMealTypesIndex = async (): Promise<Map<number, number[]>> => {
    try {
        const response = await apiClient.get('/users/recipes');
        const index = new Map<number, number[]>();
        
        response.data.forEach((recipe: any) => {
            if (recipe.meal_types && Array.isArray(recipe.meal_types)) {
                const mealTypeIds = recipe.meal_types.map((mt: any) => mt.id);
                index.set(recipe.id, mealTypeIds);
            }
        });
        
        return index;
    } catch (error) {
        return new Map();
    }
};

const mapResponseCalendar = (backendSchedule: BackendWeeklySchedule, recipeMealTypesIndex: Map<number, number[]>): WeeklySchedule => {
    const scheduleMap = new Map<DayOfWeek, CalendarRecipe[]>();
    
    DAYS.forEach(day => {
        scheduleMap.set(day, []);
    });

    if (backendSchedule?.length) {
        backendSchedule.forEach(daySchedule => {
            const dayName = normalizeDay(daySchedule.day.description);
            
            const mappedRecipes = daySchedule.recipes.map(({ recipe, meal_type }) => {
                const allowedMealTypes = recipeMealTypesIndex.get(recipe.id) || [];
                
                return {
                    id: recipe.id,
                    title: recipe.name,
                    image: recipe.image,
                    mealType: normalizeMealType(meal_type.description),
                    allowedMealTypes
                };
            });

            scheduleMap.set(dayName, mappedRecipes);
        });
    }

    const currentDay = getCurrentDayInSpanish();
    const currentDayIndex = DAYS.indexOf(currentDay);
    const reorderedDays = [
        ...DAYS.slice(currentDayIndex),
        ...DAYS.slice(0, currentDayIndex)
    ];

    return reorderedDays.map(day => ({
        [day]: scheduleMap.get(day) || []
    }));
};

export const transformToSavePayload = (schedule: WeeklySchedule): SaveWeeklySchedulePayload => {
    return schedule
        .map(daySchedule => {
            const day = Object.keys(daySchedule)[0] as DayOfWeek;
            const recipes = daySchedule[day];
            
            if (recipes.length === 0) return null;

            const transformedRecipes = recipes.map(recipe => {
                if (!recipe.mealType) return null;
                
                return {
                    recipeId: recipe.id,
                    mealTypeId: REVERSE_MEAL_TYPE_MAPPING[recipe.mealType]
                };
            }).filter((recipe): recipe is SaveRecipePayload => recipe !== null);

            if (transformedRecipes.length === 0) return null;

            return {
                dayId: REVERSE_DAY_MAPPING[day],
                recipes: transformedRecipes
            };
        })
        .filter((day): day is SaveDaySchedulePayload => day !== null);
};

export const calendarService = {
    getWeeklySchedule: async (): Promise<WeeklySchedule> => {
        const recipeMealTypesIndex = await createRecipeMealTypesIndex();
        const response = await apiClient.get<BackendWeeklySchedule>('/users/calendar');
        return mapResponseCalendar(response.data, recipeMealTypesIndex);
    },

    getFavoritesByCategory: async (): Promise<Record<string, CalendarRecipe[]>> => {
        const categorizedRecipes: Record<string, CalendarRecipe[]> = {
            'Desayuno': [],
            'Almuerzo': [],
            'Merienda': [],
            'Cena': []
        };

        const response = await apiClient.get('/users/recipes');

        response.data.forEach((recipe: any) => {
            if (recipe.meal_types && Array.isArray(recipe.meal_types)) {
                const allowedMealTypes = recipe.meal_types.map((mt: any) => mt.id);
                
                recipe.meal_types.forEach((mealType: any) => {
                    const normalizedMealType = normalizeMealType(mealType.description);
                    
                    if (categorizedRecipes[normalizedMealType]) {
                        const mappedRecipe: CalendarRecipe = {
                            id: recipe.id,
                            title: recipe.name,
                            image: recipe.image,
                            mealType: normalizedMealType,
                            allowedMealTypes
                        };
                        categorizedRecipes[normalizedMealType].push(mappedRecipe);
                    }
                });
            }
        });
        
        return categorizedRecipes;
    },

    updateWeeklySchedule: async (schedule: WeeklySchedule): Promise<WeeklySchedule> => {
        const recipeMealTypesIndex = await createRecipeMealTypesIndex();
        const transformedSchedule = transformToSavePayload(schedule);
        const response = await apiClient.put('/users/calendar', transformedSchedule);
        return mapResponseCalendar(response.data, recipeMealTypesIndex);
    }
};