import { CalendarRecipe, WeeklySchedule } from "@/types";

export const mockSchedule: WeeklySchedule = [
    {
        miércoles: [
            {
                id: 4,
                title: "Avena caliente con miel y semillas",
                img: "/recipes/recipe-4.png",
                mealType: "Desayuno"
            }
        ],
    },
    {
        jueves: [
            {
                id: 1,
                title: "Guiso de lentejas con papa y cebolla",
                img: "/recipes/recipe-1.jpg",
                mealType: "Almuerzo"
            }
        ],
    },
    {
        viernes: [],
    },
    {
        sábado: [
            {
                id: 3,
                title: "Papas al horno con mostaza y miel",
                img: "/recipes/recipe-3.jpg",
                mealType: "Almuerzo"
            },
            {
                id: 2,
                title: "Arroz salteado con salsa de soja",
                img: "/recipes/recipe-2.jpg",
                mealType: "Cena"
            }
        ]
    },
    {
        domingo: [
            {
                id: 1,
                title: "Guiso de lentejas con papa y cebolla",
                img: "/recipes/recipe-1.jpg",
                mealType: "Almuerzo"
            },
            {
                id: 2,
                title: "Arroz salteado con salsa de soja",
                img: "/recipes/recipe-2.jpg",
                mealType: "Cena"
            }
        ]
    },
    {
        lunes: [],
    },
    {
        martes: [],
    }
];

export const mockCategorizedFavorites: Record<string, CalendarRecipe[]> = {
    'Desayuno': [
        { id: 4, title: 'Avena caliente con miel y semillas', img: '/recipes/recipe-4.png', mealType: 'Desayuno' },
    ],
    'Almuerzo': [
        { id: 1, title: 'Guiso de lentejas con papa y cebolla', img: '/recipes/recipe-1.jpg', mealType: 'Almuerzo' },
        { id: 3, title: 'Papas al horno con mostaza y miel', img: '/recipes/recipe-3.jpg', mealType: 'Almuerzo' },
    ],
    'Merienda': [],
    'Cena': [
        { id: 2, title: 'Arroz salteado con salsa de soja', img: '/recipes/recipe-2.jpg', mealType: 'Cena' },
    ],
};