export const mockAnalyzeImages = async (images) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const posibles = ['Fideos', 'Avena', 'Limón', 'Zanahoria', 'Yogur', 'Leche', 'Queso'];

      // Mezclar los posibles ingredientes
      const shuffled = posibles.sort(() => 0.5 - Math.random());

      // Elegir una cantidad aleatoria entre 3 y 5
      const cantidad = Math.min(5, Math.max(3, Math.floor(Math.random() * posibles.length)));

      // Seleccionar los primeros N
      const seleccionados = shuffled.slice(0, cantidad);

      // Crear la estructura que espera tu app
      const detectados = seleccionados.map(nombre => ({
        nombre,
        fuente: 'imagen',
        confirmado: false
      }));

      resolve(detectados);
    }, 1000);
  });
};
