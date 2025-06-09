import { CalendarRecipe, WeeklySchedule } from "@/types";

export const mockSchedule: WeeklySchedule = [
    {
        jueves: [
            {
                id: 5,
                title: "Pancakes",
                img: "/platos/pancakes.PNG",
                mealType: "Desayuno"
            }
        ],
    },
    {
        viernes: [
            {
                id: 6,
                title: "Budin",
                img: "/platos/budin.PNG",
                mealType: "Merienda"
            }
        ],
    },
    {
        sabado: [],
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
        lunes: [
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
        martes: [],
    },
    {
        miercoles: [],
    }
];


export const mockCategorizedFavorites: Record<string, CalendarRecipe[]> = {
    'Desayuno': [
        { id: 1, title: 'Tostadas con Palta', img: 'https://www.giallozafferano.com/images/273-27388/Avocado-toast_1200x800.jpg', mealType: 'Desayuno' }, 
        { id: 2, title: 'Yogur con Granola', img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRtzGfgAPTkdXZYEVISAs2xwW0Zjo8PLH0mew&s', mealType: 'Desayuno' },
    ],
    'Almuerzo': [
        { id: 3, title: 'Ensalada César', img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTY2iWX1VuRMAphYc5ESwqbJbGiZ5QWbySOBw&s', mealType: 'Almuerzo' },
        { id: 4, title: 'Pasta al Pesto', img: 'https://www.hazteveg.com/img/recipes/full/201511/R24-25719.jpg', mealType: 'Almuerzo' },
    ],
    'Merienda': [
        { id: 5, title: 'Batido de Pepino', img: 'https://img.freepik.com/free-photo/healthy-drink-vegetable-smoothie_1150-26220.jpg?semt=ais_hybrid&w=740', mealType: 'Merienda' },
        { id: 6, title: 'Frutas con Nueces', img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTjgLNTnOW8WI6tc039npfjX5Zh7ggBy1CkVQ&s', mealType: 'Merienda' },
    ],
    'Cena': [
        { id: 7, title: 'Hamburguesa con papas', img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS2ccoU3TZIxLkNv_gS9rz_7scn3jBFRKHPZA&s', mealType: 'Cena' },
        { id: 8, title: 'Tarta de espinaca y queso', img: 'https://www.zafran.com.ar/wp-content/uploads/2019/12/tarta-de-espinaca.jpg', mealType: 'Cena' },
    ],
};