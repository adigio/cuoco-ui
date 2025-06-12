export const mockRecipes = [
    {
        id: 1,
        name: 'Guiso de lentejas con papa y cebolla',
        ingredients: ['lentejas', 'papa', 'cebolla', 'ajo', 'sal', 'aceite'],
        instructions:
            'Saltear cebolla y ajo en aceite. Agregar lentejas y papas en cubos. Cubrir con agua, salpimentar y cocinar a fuego lento por 40 minutos.',
        preparationTime: 45,
        difficulty: 'Media',
        image: '/recipes/recipe-1.jpg',
        subtitle: 'Una receta tradicional, fácil y reconfortante ideal para días frescos.',
    },
    {
        id: 2,
        name: 'Arroz salteado con salsa de soja',
        ingredients: ['arroz', 'cebolla', 'salsa de soja', 'ajo', 'aceite'],
        instructions:
            'Saltear cebolla y ajo en aceite. Agregar arroz cocido y salsa de soja. Mezclar bien hasta que el arroz tome color y sabor.',
        preparationTime: 20,
        difficulty: 'Fácil',
        image: '/recipes/recipe-2.jpg',
        subtitle: 'Un clásico rápido y sabroso con pocos ingredientes.',
    },
    {
        id: 3,
        name: 'Papas al horno con mostaza y miel',
        ingredients: ['papa', 'mostaza', 'miel', 'ajo', 'sal', 'aceite'],
        instructions:
            'Cortar papas en gajos. Mezclar con aceite, mostaza, miel, ajo y sal. Hornear 40 minutos hasta que estén doradas y crocantes.',
        preparationTime: 45,
        difficulty: 'Fácil',
        image: '/recipes/recipe-3.jpg',
        subtitle: 'Papas doradas al horno con un toque dulce y sabroso.',
    },
    {
        id: 4,
        name: 'Avena caliente con miel y semillas',
        ingredients: ['avena', 'miel', 'semillas de girasol', 'agua'],
        instructions:
            'Hervir avena con agua por 5-7 minutos. Endulzar con miel y decorar con semillas de girasol.',
        preparationTime: 10,
        difficulty: 'Muy fácil',
        image: '/recipes/recipe-4.png',
        subtitle: 'Un desayuno nutritivo y natural listo en minutos.',
    }
];


export const mockDetailsRecipes = [
    {
        id: 1,
        name: "Guiso de lentejas con papa y cebolla",
        subtitle: "Una receta tradicional, fácil y reconfortante ideal para días frescos.",
        time: 45,
        servings: 4,
        difficulty: "Media",
        isFavorite: false,
        stepBlocks: [
            {
                section: "Paso a paso",
                steps: [
                    {
                        number: 1,
                        title: "Preparar los ingredientes",
                        description: "Pelar y cortar las papas en cubos, picar la cebolla y el ajo.",
                        image: "https://cdn0.recetasgratis.net/es/posts/8/2/6/guiso_de_lentejas_con_papas_72628_600.webp"
                    },
                    {
                        number: 2,
                        title: "Saltear base",
                        description: "En una olla, calentar el aceite y saltear la cebolla y el ajo hasta que estén dorados.",
                        image: "https://assets.unileversolutions.com/recipes-v2/216017.jpg"
                    },
                    {
                        number: 3,
                        title: "Cocinar el guiso",
                        description: "Agregar las lentejas y papas. Cubrir con agua, salpimentar y cocinar a fuego lento durante 40 minutos.",
                        image: "https://www.clarin.com/img/2020/05/19/guiso-de-lentejas-foto-shutterstock___vB9GuU9-M_720x0__1.jpg"
                    }
                ]
            },
            {
                section: "Para la salsa de tomate",
                steps: [
                    {
                        number: 1,
                        title: "Cocinar la salsa",
                        description: "En una sartén, calentar un poco de aceite y agregar tomate triturado. Cocinar a fuego medio durante 10 minutos con sal y especias a gusto."
                    },
                    {
                        number: 2,
                        title: "Integrar al guiso",
                        description: "Una vez lista la salsa, agregarla al guiso y mezclar bien. Cocinar 5 minutos más para integrar sabores."
                    }
                ]
            }
        ],
        ingredients: [
            {
                section: "Para el guiso",
                items: [
                    { quantity: "200g", description: "Lentejas", have: false },
                    { quantity: "2", description: "Papas", have: false },
                    { quantity: "1", description: "Cebolla", have: true },
                    { quantity: "2 dientes", description: "Ajo", have: true },
                    { quantity: "A gusto", description: "Sal", have: true },
                    { quantity: "2 cucharadas", description: "Aceite", have: true }
                ]
            },
            {
                section: "Para la salsa de tomate",
                items: [
                    { quantity: "200ml", description: "Tomate triturado", have: false },
                    { quantity: "A gusto", description: "Sal y especias", have: true },
                    { quantity: "1 cucharada", description: "Aceite", have: true }
                ]
            }
        ],
        missingIngredients: [
            { quantity: "200g", description: "Lentejas" },
            { quantity: "2", description: "Papas" },
            { quantity: "200ml", description: "Tomate triturado" }
        ],
        observation: "Podés reemplazar el tomate triturado por puré de tomates o tomates frescos licuados."
    },
    {
        id: 2,
        name: 'Arroz salteado con salsa de soja',
        subtitle: 'Un clásico rápido y sabroso con pocos ingredientes.',
        time: 20,
        servings: 2,
        difficulty: 'Fácil',
        isFavorite: false,
        stepBlocks: [
            {
                section: 'Paso a paso',
                steps: [
                    {
                        number: 1,
                        title: 'Preparar los ingredientes',
                        description: 'Picar la cebolla y el ajo. Cocinar el arroz previamente si no está cocido.',
                        image: '/recipes/steps/arroz1.jpg'
                    },
                    {
                        number: 2,
                        title: 'Saltear',
                        description: 'En una sartén con aceite caliente, saltear el ajo y la cebolla hasta que estén transparentes.',
                        image: '/recipes/steps/arroz2.jpg'
                    },
                    {
                        number: 3,
                        title: 'Agregar arroz y soja',
                        description: 'Agregar el arroz cocido, incorporar la salsa de soja y mezclar bien hasta que tome sabor y color.',
                        image: '/recipes/steps/arroz3.jpg'
                    }
                ]
            }
        ],
        ingredients: [
            {
                section: 'Ingredientes',
                items: [
                    { quantity: '2 tazas', description: 'Arroz cocido', have: false },
                    { quantity: '1', description: 'Cebolla', have: true },
                    { quantity: '2 cucharadas', description: 'Salsa de soja', have: true },
                    { quantity: '1 diente', description: 'Ajo', have: true },
                    { quantity: '2 cucharadas', description: 'Aceite', have: true }
                ]
            }
        ],
        missingIngredients: [
            { quantity: '2 tazas', description: 'Arroz cocido' }
        ],
        observation: 'Se puede agregar huevo revuelto o verduras salteadas para una versión más completa.'
    },
    {
        id: 3,
        name: 'Papas al horno con mostaza y miel',
        subtitle: 'Papas doradas al horno con un toque dulce y sabroso.',
        time: 45,
        servings: 3,
        difficulty: 'Fácil',
        isFavorite: false,
        stepBlocks: [
            {
                section: 'Paso a paso',
                steps: [
                    {
                        number: 1,
                        title: 'Preparar las papas',
                        description: 'Lavar y cortar las papas en gajos. Precalentar el horno a 200°C.',
                        image: '/recipes/steps/papas1.jpg'
                    },
                    {
                        number: 2,
                        title: 'Mezclar los ingredientes',
                        description: 'En un bowl, mezclar las papas con aceite, mostaza, miel, ajo picado y sal.',
                        image: '/recipes/steps/papas2.jpg'
                    },
                    {
                        number: 3,
                        title: 'Hornear',
                        description: 'Colocar en una bandeja y hornear por 40 minutos o hasta que estén doradas y crocantes.',
                        image: '/recipes/steps/papas3.jpg'
                    }
                ]
            }
        ],
        ingredients: [
            {
                section: 'Ingredientes',
                items: [
                    { quantity: '3', description: 'Papas', have: true },
                    { quantity: '2 cucharadas', description: 'Mostaza', have: true },
                    { quantity: '1 cucharada', description: 'Miel', have: true },
                    { quantity: '1 diente', description: 'Ajo', have: true },
                    { quantity: 'A gusto', description: 'Sal', have: true },
                    { quantity: '2 cucharadas', description: 'Aceite', have: true }
                ]
            }
        ],
        missingIngredients: [],
        observation: 'Ideal acompañar con alguna salsa fresca como alioli o yogur con limón.'
    },
    {
        id: 4,
        name: 'Avena caliente con miel y semillas',
        subtitle: 'Un desayuno nutritivo y natural listo en minutos.',
        time: 10,
        servings: 1,
        difficulty: 'Muy fácil',
        isFavorite: false,
        stepBlocks: [
            {
                section: 'Paso a paso',
                steps: [
                    {
                        number: 1,
                        title: 'Cocinar la avena',
                        description: 'Hervir la avena en agua durante 5–7 minutos hasta lograr una textura cremosa.',
                        image: '/recipes/steps/avena1.jpg'
                    },
                    {
                        number: 2,
                        title: 'Servir',
                        description: 'Servir en un bowl, endulzar con miel y decorar con semillas de girasol.',
                        image: '/recipes/steps/avena2.jpg'
                    }
                ]
            }
        ],
        ingredients: [
            {
                section: 'Ingredientes',
                items: [
                    { quantity: '1/2 taza', description: 'Avena', have: false },
                    { quantity: '1 cucharada', description: 'Miel', have: true },
                    { quantity: '1 cucharada', description: 'Semillas de girasol', have: false },
                    { quantity: '1 taza', description: 'Agua', have: true }
                ]
            }
        ],
        missingIngredients: [
            { quantity: '1/2 taza', description: 'Avena' },
            { quantity: '1 cucharada', description: 'Semillas de girasol' }
        ],
        observation: 'Podés usar leche en lugar de agua para una versión más cremosa.'
    }
];
