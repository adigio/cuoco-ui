export const mockRecipes = [
    {
        id: 1,
        name: 'Fideos con salsa',
        ingredients: ['fideos', 'tomate', 'cebolla', 'ajo'],
        instructions: 'Hervir los fideos. Mientras, saltear cebolla y ajo. Añadir tomate y cocinar 10 minutos.',
        preparationTime: 25,
        difficulty: 'Fácil',
        image: 'https://alicante.com.ar/wp-content/uploads/2022/06/iStock-1185433826.jpg',
        subtitle: 'Una receta de cocina rápida y fácil para preparar los fideos con salsa y tomate.',
    },
    {
        id: 2,
        name: 'Ensalada de avena y yogur',
        ingredients: ['avena', 'yogur', 'miel', 'limón'],
        instructions: 'Mezclar la avena con el yogur. Añadir miel al gusto y unas gotas de limón.',
        preparationTime: 10,
        difficulty: 'Muy fácil',
        image: 'https://avenacanada.com/wp-content/uploads/2022/09/La-ensalada-Aniston-1.jpg',
        subtitle: 'Una receta de cocina rápida y fácil para preparar la ensalada de avena y yogur.',
    },
    {
        id: 3,
        name: 'Queso gratinado con verduras',
        ingredients: ['queso', 'zanahoria', 'tomate', 'cebolla'],
        instructions: 'Cortar las verduras y colocar en una fuente. Cubrir con queso rallado y gratinar.',
        preparationTime: 30,
        difficulty: 'Media',
        image: 'https://okdiario.com/img/recetas/2016/07/21/gratinado-de-verduras-al-queso.jpg',
        subtitle: 'Una receta de cocina rápida y fácil para preparar el queso gratinado con verduras.',
    },
    {
        id: 4,
        name: 'Batido de frutas con leche',
        ingredients: ['leche', 'banana', 'frutilla', 'miel'],
        instructions: 'Licuar todos los ingredientes hasta obtener una mezcla homogénea.',
        preparationTime: 5,
        difficulty: 'Muy fácil',
        image: 'https://www.elmejornido.com/sites/g/files/jgfbjl316/files/srh_recipes/20f62bd6b03a0bd31b98ab915ab91be2.jpg',
        subtitle: 'Una receta de cocina rápida y fácil para preparar un batido de frutas con leche.',
    }
];


export const mockDetailsRecipes2 = [
    {
        id: 1,
        name: 'Fideos con salsa',
        ingredients: ['fideos', 'tomate', 'cebolla', 'ajo'],
        missingIngredients: ['cebolla', 'ajo'],
        instructions: [
            'Hervir los fideos en agua con sal hasta que estén al dente.',
            'Mientras tanto, picar la cebolla y el ajo.',
            'Saltear la cebolla y el ajo en una sartén con aceite.',
            'Añadir el tomate y cocinar durante 10 minutos.',
            'Mezclar con los fideos y servir caliente.'
        ],
        preparationTime: 25,
        difficulty: 'Fácil',
        image: 'https://alicante.com.ar/wp-content/uploads/2022/06/iStock-1185433826.jpg',
        subtitle: 'Una receta de cocina rápida y fácil para preparar los fideos con salsa y tomate.',
    },
    {
        id: 2,
        name: 'Ensalada de avena y yogur',
        ingredients: ['avena', 'yogur', 'miel', 'limón'],
        missingIngredients: ['avena', 'yogur', 'miel', 'limón'],
        instructions: [
            'Colocar la avena en un bol.',
            'Añadir el yogur natural y mezclar bien.',
            'Agregar miel al gusto.',
            'Exprimir unas gotas de limón y mezclar nuevamente.',
            'Servir frío.'
        ],
        preparationTime: 10,
        difficulty: 'Muy fácil',
        image: 'https://avenacanada.com/wp-content/uploads/2022/09/La-ensalada-Aniston-1.jpg',
        subtitle: 'Una receta de cocina rápida y fácil para preparar la ensalada de avena y yogur.',
    },
    {
        id: 3,
        name: 'Queso gratinado con verduras',
        ingredients: ['queso', 'zanahoria', 'tomate', 'cebolla'],
        missingIngredients: ['queso', 'zanahoria', 'cebolla'],
        instructions: [
            'Pelar y cortar la zanahoria, el tomate y la cebolla.',
            'Disponer las verduras en una fuente para horno.',
            'Cubrir con queso rallado a gusto.',
            'Llevar al horno y gratinar hasta que el queso esté dorado.',
            'Servir caliente.'
        ],
        preparationTime: 30,
        difficulty: 'Media',
        image: 'https://okdiario.com/img/recetas/2016/07/21/gratinado-de-verduras-al-queso.jpg',
        subtitle: 'Una receta de cocina rápida y fácil para preparar el queso gratinado con verduras.',
    },
    {
        id: 4,
        name: 'Batido de frutas con leche',
        ingredients: ['leche', 'banana', 'frutilla', 'miel'],
        missingIngredients: ['frutilla', 'miel'],
        instructions: [
            'Pelar la banana y lavar las frutillas.',
            'Colocar las frutas en una licuadora.',
            'Añadir leche y miel al gusto.',
            'Licuar hasta obtener una mezcla homogénea.',
            'Servir frío.'
        ],
        preparationTime: 5,
        difficulty: 'Muy fácil',
        image: 'https://www.elmejornido.com/sites/g/files/jgfbjl316/files/srh_recipes/20f62bd6b03a0bd31b98ab915ab91be2.jpg',
        subtitle: 'Una receta de cocina rápida y fácil para preparar un batido de frutas con leche.',
    }
];


export const mockDetailsRecipes = [
    {
        id: 1,
        name: "Ñoquis con salsa blanca",
        subtitle: "Receta casera de ñoquis con salsa blanca cremosa.",
        time: 60,
        servings: 3,
        difficulty: "Media",
        isFavorite: false,
        stepBlocks: [
            {
                section: "Paso a paso",
                steps: [
                    {
                        number: 1,
                        title: "Hervir las papas",
                        description: "Lavar bien las papas y hervirlas con cáscara durante 25–30 minutos o hasta que estén tiernas al pinchar con un tenedor.",
                        image: "https://www.cucinare.tv/wp-content/uploads/2020/07/Papas-hervidas.jpg"
                    },
                    {
                        number: 2,
                        title: "Preparar el puré",
                        description: "Escurrir, pelar en caliente y hacer puré sin grumos. Dejar entibiar.",
                        image: "https://cdn7.kiwilimon.com/recetaimagen/3706/640x426/3706.jpg.webp"
                    },
                    {
                        number: 3,
                        title: "Formar la masa",
                        description: "Colocar el puré en un bowl, agregar el huevo y sal a gusto. Incorporar de a poco la harina hasta lograr una masa blanda, homogénea y apenas pegajosa (no sobretrabajar para evitar ñoquis duros).",
                        image: "https://www.paulinacocina.net/wp-content/uploads/2022/08/como-hacer-noquis-caseros.jpg"
                    }
                ]
            },
            {
                section: "Para la salsa blanca",
                steps: [
                    {
                        number: 1,
                        title: "Base de la salsa",
                        description: "En una cacerola, derretir la manteca a fuego medio. Agregar las 2 cucharadas de harina y mezclar bien durante 1-2 minutos."
                    },
                    {
                        number: 2,
                        title: "Agregar la leche",
                        description: "Agregar la leche caliente poco a poco, batiendo constantemente con batidor de mano o cuchara de madera para evitar grumos."
                    },
                    {
                        number: 3,
                        title: "Cocinar",
                        description: "Cocinar removiendo sin parar hasta que espese (unos 5 minutos). Debería quedar una textura cremosa."
                    },
                    {
                        number: 4,
                        title: "Condimentar",
                        description: "Agregar sal, pimienta y una pizca de nuez moscada. Incorporar el queso rallado y mezclar hasta fundir."
                    }
                ]
            }
        ],
        ingredients: [
            {
                section: "Para los ñoquis",
                items: [
                    { quantity: "600g", description: "Papa", have: false },
                    { quantity: "150g", description: "Harina de sémola", have: false },
                    { quantity: "1", description: "Huevo", have: true },
                    { quantity: "A gusto", description: "Sal", have: true }
                ]
            },
            {
                section: "Para la salsa blanca",
                items: [
                    { quantity: "30g", description: "Manteca", have: true },
                    { quantity: "2 cucharadas", description: "Harina", have: true },
                    { quantity: "1/2 litro", description: "Leche", have: true },
                    { quantity: "A gusto", description: "Sal, pimienta y nuez moscada", have: true },
                    { quantity: "A gusto", description: "Queso rallado", have: false }
                ]
            }
        ],
        missingIngredients: [
            { quantity: "600g", description: "Papa" },
            { quantity: "150g", description: "Harina de sémola" },
            { quantity: "A gusto", description: "Queso rallado" }
        ],
        observation: "Si la masa queda muy húmeda, agregar un poco más de harina.",
    }
];