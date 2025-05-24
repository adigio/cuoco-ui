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


export const mockDetailsRecipes = [
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
