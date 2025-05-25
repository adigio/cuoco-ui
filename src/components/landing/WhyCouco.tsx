

export default function WhyCuoco() {
  return (
    <section
      id="beneficios"
      className="w-full min-h-[80vh] bg-white-200 py-25 md:py-8 md:pt-20 px-4 flex flex-col items-center"
    >
    
        <div className="flex-1">
          <h2 className="text-3xl font-bold text-gray-800 mb-4 text-center">
            ¿Por qué Cuoco?
          </h2>
          <p className="text-lg text-gray-700 leading-relaxed">
            Cuoco te ayuda a ahorrar tiempo, evitar el desperdicio y aprovechar
            mejor lo que ya tenés. Cocinar rico y casero nunca fue tan fácil,
            práctico y sustentable.
          </p>
        </div>

        {/* Imagen */}
        <div className="flex-1">
          <img
            src="/whyCuocoImg.jpg" // Asegurate que esté en /public o accesible
            alt="Cocina en familia"
            className="rounded-xl shadow-md w-full max-w-md mx-auto"
          /> 
      </div>
    </section>
  );
}
