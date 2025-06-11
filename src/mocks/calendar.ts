import { CalendarRecipe, WeeklySchedule } from "@/types";

export const mockSchedule: WeeklySchedule = [
    {
        miércoles: [
            {
                id: 5,
                title: "Pancakes",
                img: "/platos/pancakes.PNG",
                mealType: "Desayuno"
            }
        ],
    },
    {
        jueves: [
            {
                id: 6,
                title: "Budin",
                img: "/platos/budin.PNG",
                mealType: "Merienda"
            }
        ],
    },
    {
        viernes: [],
    },
    {
        domingo: [
            {
                id: 1,
                title: "Pollo con zapallitos",
                img: "/platos/pollo_zapallitos.PNG",
                mealType: "Almuerzo"
            },
            {
                id: 2,
                title: "Ensalada César",
                img: "/platos/ensalada_cesar.PNG",
                mealType: "Cena"
            }
        ]
    },
    {
        sábado: [
            {
                id: 3,
                title: "Pasta al pesto",
                img: "/platos/pasta_al_pesto.PNG",
                mealType: "Almuerzo"
            },
            {
                id: 4,
                title: "Salmón grillado",
                img: "/platos/salmon.PNG",
                mealType: "Cena"
            }
        ]
    },
    {
        domingo: [],
    },
    {
        lunes: [],
    }
];


export const mockCategorizedFavorites: Record<string, CalendarRecipe[]> = {
    'Desayuno': [
        { id: 1, title: 'Tostadas con Palta', img: '/recipes/calendar-1.avif', mealType: 'Desayuno' }, 
        { id: 2, title: 'Yogur con Granola', img: '/recipes/calendar-2.jpeg', mealType: 'Desayuno' },
    ],
    'Almuerzo': [
        { id: 3, title: 'Ensalada César', img: '/recipes/calendar-3.jpeg', mealType: 'Almuerzo' },
        { id: 4, title: 'Pasta al Pesto', img: '/recipes/calendar-4.jpeg', mealType: 'Almuerzo' },
    ],
    'Merienda': [
        { id: 5, title: 'Batido de Pepino', img: '/recipes/calendar-5.avif', mealType: 'Merienda' },
        { id: 6, title: 'Frutas con Nueces', img: '/recipes/calendar-6.jpeg', mealType: 'Merienda' },
    ],
    'Cena': [
        { id: 7, title: 'Hamburguesa con papas', img: '/recipes/calendar-7.jpeg', mealType: 'Cena' },
        { id: 8, title: 'Tarta de espinaca y queso', img: '/recipes/calendar-8.jpg', mealType: 'Cena' },
    ],
};