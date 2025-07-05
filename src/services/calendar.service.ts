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
    // Ajustar porque JS usa 0 para domingo y nosotros usamos 7
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

const mapResponseCalendar = (backendSchedule: BackendWeeklySchedule): WeeklySchedule => {
    const scheduleMap = new Map<DayOfWeek, CalendarRecipe[]>();
    
    DAYS.forEach(day => {
        scheduleMap.set(day, []);
    });

    if (backendSchedule?.length) {
        backendSchedule.forEach(daySchedule => {
            const dayName = normalizeDay(daySchedule.day.description);
            
            const mappedRecipes = daySchedule.recipes.map(({ recipe, meal_type }) => ({
                id: recipe.id,
                title: recipe.name,
                image: recipe.image,
                mealType: normalizeDay(meal_type.description) as MealType
            }));

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
        const response = await apiClient.get<BackendWeeklySchedule>('/users/calendar');
        return mapResponseCalendar(response.data);
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
            // Asumimos que el backend envía el tipo de comida
            const mappedRecipe: CalendarRecipe = {
                id: recipe.id,
                title: recipe.name,
                image: recipe.image,
                mealType: recipe.meal_type?.description || MEAL_TYPES[0]
            };

            if (mappedRecipe.mealType) {
                categorizedRecipes[mappedRecipe.mealType].push(mappedRecipe);
            }
        });

        return categorizedRecipes;
    },

    updateWeeklySchedule: async (schedule: WeeklySchedule): Promise<WeeklySchedule> => {
        const transformedSchedule = transformToSavePayload(schedule);
        const response = await apiClient.post('/users/calendar', transformedSchedule);
        return mapResponseCalendar(response.data);
    }
};