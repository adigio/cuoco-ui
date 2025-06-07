export interface Recipe {
  id: number;
  title: string;
  portions: number;
  image: string;
}

export interface Step {
  title: string;
  instructions: string[];
  estimatedTime: number;
}

export interface MealPrep {
  id: number;
  title: string;
  observation: string;
  estimatedCookingTime: number;
  totalPortions: number;
  ingredients: String[];
  recipes: Recipe[];
  steps: Step[];
}

export const mealPreps: MealPrep[] = [
  {
    id: 1,
    title: "Meal Prep Proteico y Saludable",
    estimatedCookingTime: 120,
    observation: "Se puede guardar en la heladera",
    totalPortions: 15,
    ingredients: [
      "2 pechugas de pollo",
      "1 taza de arroz integral",
      "1 cebolla",
      "1 diente de ajo",
      "1 cda de curry en polvo",
      "1 cda de aceite de oliva",
      "Sal y pimienta a gusto",
      "4 tortillas integrales",
      "1 lata de atún",
      "1 zanahoria rallada",
      "1 taza de lechuga",
      "2 cdas de hummus",
      "2 bananas maduras",
      "1 taza de avena",
      "1 cdita de canela",
      "1/4 taza de chips de chocolate",
    ],
    recipes: [
      {
        id: 1,
        title: "Pollo al curry con arroz integral",
        portions: 4,
        image:
          "https://img-global.cpcdn.com/recipes/5af5179b263ac39f/1280x1280sq90/photo.webp",
      },
      {
        id: 2,
        title: "Wrap de atún con vegetales",
        portions: 4,
        image:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTbWFIqMTN_EVCjMDtiwKiVyN_eQwjcyb9wVh6pkt6fcWBy2anm87tTZ6kuvRYbvFaLrs0&usqp=CAU",
      },
      {
        id: 3,
        title: "Galletas de avena y banana",
        portions: 4,
        image:
          "https://content-cocina.lecturas.com/medio/2022/03/22/galletas_de_avena_658e721e_1200x1200.jpg",
      },
    ],
    steps: [
      {
        title: "Preparar ingredientes",
        instructions: [
          "Cortar cebolla, ajo, zanahoria y lechuga.",
          "Cocer arroz integral.",
          "Precalentar horno para galletas.",
        ],
        estimatedTime: 30,
      },
      {
        title: "Cocinar recetas",
        instructions: [
          "Saltear cebolla, añadir pollo, curry y cocer con arroz.",
          "Rellenar tortillas con atún, zanahoria, lechuga y hummus.",
          "Mezclar avena, banana, canela y chips de chocolate. Formar galletas y hornear 15 min.",
        ],
        estimatedTime: 60,
      },
      {
        title: "Armar porciones y guardar",
        instructions: [
          "Dividir cada receta en 5 porciones.",
          "Etiquetar los contenedores.",
          "Guardar en freezer o heladera.",
        ],
        estimatedTime: 30,
      },
    ],
  },
  {
    id: 2,
    title: "Meal Prep Vegano Energético",
    estimatedCookingTime: 100,
    observation: "Se puede guardar en la heladera",
    totalPortions: 12,
    ingredients: [
      "1 taza de quinoa",
      "1 taza de lentejas",
      "1 palta",
      "1 zanahoria",
      "1 tomate",
      "1 cebolla",
      "1 taza de dátiles",
      "2 tazas de avena",
      "Condimentos a gusto",
      "Papel film o tuppers",
    ],
    recipes: [
      {
        id: 4,
        title: "Buddha bowl de quinoa",
        portions: 4,
        image:
          "https://biancazapatka.com/wp-content/uploads/2021/07/buddha-bowl-mediterran.jpg",
      },
      {
        id: 5,
        title: "Tacos de lentejas",
        portions: 4,
        image:
          "https://healthysimpleyum.com/wp-content/uploads/2021/06/IMG_6761-718x1024.jpg",
      },
      {
        id: 6,
        title: "Barritas de avena y dátiles",
        portions: 4,
        image:
          "https://d36fw6y2wq3bat.cloudfront.net/recipes/barritas-de-avena-y-datiles/900/barritas-de-avena-y-datiles_version_1670409940.jpg",
      },
    ],
    steps: [
      {
        title: "Preparar ingredientes",
        instructions: [
          "Cocer quinoa y lentejas.",
          "Cortar palta, zanahoria, tomate y cebolla.",
          "Procesar dátiles y mezclar con avena.",
        ],
        estimatedTime: 30,
      },
      {
        title: "Cocinar recetas",
        instructions: [
          "Armar los buddha bowls con quinoa y vegetales.",
          "Saltear lentejas con condimentos y armar tacos.",
          "Formar barritas con avena y dátiles y refrigerar.",
        ],
        estimatedTime: 45,
      },
      {
        title: "Empaquetar y conservar",
        instructions: [
          "Separar en porciones individuales.",
          "Colocar en tuppers o papel film.",
          "Guardar en freezer o heladera.",
        ],
        estimatedTime: 25,
      },
    ],
  },
  {
    id: 3,
    title: "Meal Prep Familiar Clásico",
    estimatedCookingTime: 135,
    observation: "Se puede guardar en la heladera",
    totalPortions: 18,
    ingredients: [
      "200 g de pasta seca",
      "250 g de carne picada",
      "1 lata de tomate triturado",
      "1 cebolla",
      "1 diente de ajo",
      "Sal y orégano a gusto",
      "2 atados de espinaca",
      "150 g de queso rallado",
      "2 huevos",
      "1 base de masa para tarta",
      "2 zanahorias",
      "2 huevos",
      "1 taza de harina",
      "1/2 taza de azúcar",
      "1 cdita de polvo de hornear",
      "Aceite o manteca para engrasar moldes",
    ],
    recipes: [
      {
        id: 7,
        title: "Pasta boloñesa",
        portions: 4,
        image:
          "https://images.unsplash.com/photo-1588196749597-9ff075ee6b5b?auto=format&fit=crop&w=800&q=80",
      },
      {
        id: 8,
        title: "Tarta de espinaca y queso",
        portions: 4,
        image:
          "https://images.unsplash.com/photo-1588196749597-9ff075ee6b5b?auto=format&fit=crop&w=800&q=80",
      },
      {
        id: 9,
        title: "Muffins de zanahoria",
        portions: 4,
        image:
          "https://images.unsplash.com/photo-1588196749597-9ff075ee6b5b?auto=format&fit=crop&w=800&q=80",
      },
    ],
    steps: [
      {
        title: "Preparación inicial",
        instructions: [
          "Picar cebolla, ajo y espinaca.",
          "Hervir pasta.",
          "Precalentar horno para muffins y tarta.",
        ],
        estimatedTime: 35,
      },
      {
        title: "Cocción",
        instructions: [
          "Preparar salsa boloñesa y mezclar con pasta.",
          "Hacer mezcla de espinaca, huevos y queso. Hornear en base de tarta.",
          "Mezclar zanahoria rallada con harina, huevo y azúcar para muffins y hornear.",
        ],
        estimatedTime: 60,
      },
      {
        title: "División y almacenado",
        instructions: [
          "Separar en tuppers para almuerzo/cena y snacks.",
          "Etiquetar y enfriar.",
          "Almacenar en freezer o heladera.",
        ],
        estimatedTime: 40,
      },
    ],
  },
];
