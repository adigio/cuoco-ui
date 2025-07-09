import { act } from "react-dom/test-utils";
import { useIngredientsStore } from "@/store/useIngredientsStore"; // ajusta la ruta si es distinta
import { Ingredient } from "@/types";

const kgUnit: { id: number; description: string; symbol?: string } = {
  id: 1,
  description: "kilogramo",
  symbol: "kg",
};

describe("useIngredientsStore - gestión de ingredientes y sesión de generación", () => {
  beforeEach(() => {
    // Reiniciar estado antes de cada test para evitar contaminación cruzada
    useIngredientsStore.setState({
      ingredients: [],
      mode: null,
      generatorSessionActive: false,
    });
  });

  it("Estado inicial: ingredientes vacío, modo nulo y sesión inactiva", () => {
    const state = useIngredientsStore.getState();
    expect(state.ingredients).toEqual([]);
    expect(state.mode).toBeNull();
    expect(state.generatorSessionActive).toBe(false);
  });

  it("setMode cambia correctamente el modo de operación", () => {
    act(() => {
      useIngredientsStore.getState().setMode("testMode");
    });
    expect(useIngredientsStore.getState().mode).toBe("testMode");
  });

  it("startGeneratorSession activa la sesión de generación", () => {
    act(() => {
      useIngredientsStore.getState().startGeneratorSession();
    });
    expect(useIngredientsStore.getState().generatorSessionActive).toBe(true);
  });

  it("endGeneratorSession reinicia ingredientes, modo y desactiva la sesión", () => {
    act(() => {
      useIngredientsStore.setState({
        ingredients: [
          {
            name: "abc",
            quantity: 1,
            unit: kgUnit,
            optional: false,
            source: "manual",
            confirmed: true,
          },
        ],
        mode: "someMode",
        generatorSessionActive: true,
      });
      useIngredientsStore.getState().endGeneratorSession();
    });
    const state = useIngredientsStore.getState();
    expect(state.generatorSessionActive).toBe(false);
    expect(state.ingredients).toEqual([]);
    expect(state.mode).toBeNull();
  });

  describe("clearIngredientsIfNeeded - comportamiento según ruta y estado de sesión", () => {
    it("Resetea estado si ruta NO está en flujo de generación y sesión está activa", () => {
      act(() => {
        useIngredientsStore.setState({ generatorSessionActive: true });
        useIngredientsStore.getState().clearIngredientsIfNeeded("/home");
      });
      const state = useIngredientsStore.getState();
      expect(state.generatorSessionActive).toBe(false);
      expect(state.ingredients).toEqual([]);
      expect(state.mode).toBeNull();
    });

    it("Activa sesión si ruta está en flujo de generación pero sesión estaba inactiva", () => {
      act(() => {
        useIngredientsStore.setState({ generatorSessionActive: false });
        useIngredientsStore.getState().clearIngredientsIfNeeded("/recipe-generator");
      });
      expect(useIngredientsStore.getState().generatorSessionActive).toBe(true);
    });

    it("No modifica nada si ruta está en flujo y sesión ya está activa", () => {
      act(() => {
        useIngredientsStore.setState({ generatorSessionActive: true });
        useIngredientsStore.getState().clearIngredientsIfNeeded("/results");
      });
      expect(useIngredientsStore.getState().generatorSessionActive).toBe(true);
    });

    it("No modifica nada si ruta no está en flujo y sesión ya está inactiva", () => {
      act(() => {
        useIngredientsStore.setState({ generatorSessionActive: false });
        useIngredientsStore.getState().clearIngredientsIfNeeded("/home");
      });
      expect(useIngredientsStore.getState().generatorSessionActive).toBe(false);
    });
  });

  describe("addIngredient - agregar ingredientes a la lista", () => {
    it("Agrega un ingrediente válido a la lista y retorna true", async () => {
      let result;
      await act(async () => {
        result = await useIngredientsStore
          .getState()
          .addIngredient("Tomate", 2, "kg", "kg");
      });
      expect(result).toBe(true);
      expect(useIngredientsStore.getState().ingredients.length).toBe(1);
      expect(useIngredientsStore.getState().ingredients[0].name).toBe("Tomate");
    });

    it("No agrega ingrediente sin nombre o con nombre vacío, retorna false", () => {
      const res1 = useIngredientsStore.getState().addIngredient("", 1, "kg", "kg");
      const res2 = useIngredientsStore.getState().addIngredient("   ", 1, "kg", "kg");
      expect(res1).toBe(false);
      expect(res2).toBe(false);
      expect(useIngredientsStore.getState().ingredients.length).toBe(0);
    });

    it("No agrega ingrediente si ya existe (case insensitive), retorna false", () => {
      useIngredientsStore.getState().addIngredient("Tomate", 1, "kg", "kg");
      const result = useIngredientsStore.getState().addIngredient("tomate", 2, "kg", "kg");
      expect(result).toBe(false);
      expect(useIngredientsStore.getState().ingredients.length).toBe(1);
    });
  });

  it("removeIngredient elimina correctamente un ingrediente por índice", () => {
    act(() => {
      useIngredientsStore.setState({
        ingredients: [
          {
            name: "A",
            quantity: 1,
            unit: kgUnit,
            optional: false,
            source: "manual",
            confirmed: true,
          },
          {
            name: "B",
            quantity: 2,
            unit: kgUnit,
            optional: false,
            source: "manual",
            confirmed: true,
          },
        ],
      });
      useIngredientsStore.getState().removeIngredient(0);
    });
    const ingredients = useIngredientsStore.getState().ingredients;
    expect(ingredients.length).toBe(1);
    expect(ingredients[0].name).toBe("B");
  });

  it("updateIngredient actualiza propiedades de ingrediente por índice", () => {
    act(() => {
      useIngredientsStore.setState({
        ingredients: [
          {
            name: "A",
            quantity: 1,
            unit: kgUnit,
            optional: false,
            source: "manual",
            confirmed: false,
          },
        ],
      });
      useIngredientsStore
        .getState()
        .updateIngredient(0, { quantity: 5, confirmed: true });
    });
    const ing = useIngredientsStore.getState().ingredients[0];
    expect(ing.quantity).toBe(5);
    expect(ing.confirmed).toBe(true);
  });

  it("confirmIngredient marca el ingrediente como confirmado", () => {
    act(() => {
      useIngredientsStore.setState({
        ingredients: [
          {
            name: "A",
            quantity: 1,
            unit: kgUnit,
            optional: false,
            source: "manual",
            confirmed: false,
          },
        ],
      });
      useIngredientsStore.getState().confirmIngredient(0);
    });
    expect(useIngredientsStore.getState().ingredients[0].confirmed).toBe(true);
  });

  describe("addMultipleIngredients - agrega varios ingredientes únicos", () => {
    it("Solo agrega ingredientes no repetidos (case insensitive)", () => {
      act(() => {
        useIngredientsStore.setState({
          ingredients: [
            {
              name: "Tomate",
              quantity: 1,
              unit: kgUnit,
              optional: false,
              source: "manual",
              confirmed: true,
            },
          ],
        });
      });
      const newIngredients: Ingredient[] = [
        {
          name: "Tomate",
          quantity: 2,
          unit: kgUnit,
          optional: false,
          source: "manual",
          confirmed: true,
        },
        {
          name: "Cebolla",
          quantity: 1,
          unit: kgUnit,
          optional: false,
          source: "manual",
          confirmed: true,
        },
      ];
      const addedCount = useIngredientsStore
        .getState()
        .addMultipleIngredients(newIngredients);
      expect(addedCount).toBe(1);
      const allIngredients = useIngredientsStore.getState().ingredients;
      expect(allIngredients.length).toBe(2);
      expect(allIngredients.some((i) => i.name === "Cebolla")).toBe(true);
    });

    it("No agrega ingredientes si todos ya existen", () => {
      act(() => {
        useIngredientsStore.setState({
          ingredients: [
            {
              name: "Tomate",
              quantity: 1,
              unit: kgUnit,
              optional: false,
              source: "manual",
              confirmed: true,
            },
          ],
        });
      });
      const newIngredients: Ingredient[] = [
        {
          name: "Tomate",
          quantity: 2,
          unit: kgUnit,
          optional: false,
          source: "manual",
          confirmed: true,
        },
      ];
      const addedCount = useIngredientsStore
        .getState()
        .addMultipleIngredients(newIngredients);
      expect(addedCount).toBe(0);
      expect(useIngredientsStore.getState().ingredients.length).toBe(1);
    });
  });

  it("clearIngredients elimina todos los ingredientes de la lista", () => {
    act(() => {
      useIngredientsStore.setState({
        ingredients: [
          {
            name: "Tomate",
            quantity: 1,
            unit: kgUnit,
            optional: false,
            source: "manual",
            confirmed: true,
          },
        ],
      });
      useIngredientsStore.getState().clearIngredients();
    });
    expect(useIngredientsStore.getState().ingredients.length).toBe(0);
  });
});
