export default function Beneficios() {
    return (
      <section className="py-20 bg-purple-200 w-full">
        <div className="container mx-auto px-4">
          {/* Contenedor con grid y flexbox */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Primer beneficio */}
            <div className="max-w-sm bg-white rounded-4xl overflow-hidden shadow-xl">
              <div className="px-6 py-4">
                <div className="font-bold text-xl mb-2">¿Qué cocino hoy?</div>
                <p className="text-gray-700 text-base">
                  Recetas que usan lo que ya tenés
                </p>
              </div>
              <img
                className="w-full h-80 object-cover rounded-lg"
                src="/heladera confundida.jpg"
                alt="¿Qué cocino hoy?"
              />
            </div>
  
            {/* Segundo beneficio */}
            <div className="max-w-sm bg-white rounded-4xl overflow-hidden shadow-xl">
              <div className="px-6 py-4">
                <div className="font-bold text-xl mb-2">Usá lo que ya tenés</div>
                <p className="text-gray-700 text-base">
                  Subí una foto, la IA hace el resto
                </p>
              </div>
              <img
                className="w-full h-80 object-cover rounded-lg"
                src="/escaneo de heladera.webp"
                alt="Usá lo que ya tenés"
              />
            </div>
  
            {/* Tercer beneficio */}
            <div className="max-w-sm bg-white rounded-4xl overflow-hidden shadow-xl">
              <div className="px-6 py-4">
                <div className="font-bold text-xl mb-2">Menos desperdicio</div>
                <p className="text-gray-700 text-base">
                  Aprovechá al máximo tu despensa
                </p>
              </div>
              <img
                className="w-full h-80 object-cover rounded-lg"
                src="/plato.jpeg"
                alt="Menos desperdicio"
              />
            </div>
  
            {/* Cuarto beneficio */}
            <div className="max-w-sm bg-white rounded-4xl overflow-hidden shadow-xl">
              <div className="px-6 py-4">
                <div className="font-bold text-xl mb-2">Cociná sin estrés</div>
                <p className="text-gray-700 text-base">
                  Rápido, rico y sin vueltas
                </p>
              </div>
              <img
                className="w-full h-80 object-cover rounded-lg"
                src="/comiendo.jpg"
                alt="Cociná sin estrés"
              />
            </div>
          </div>
        </div>
      </section>
    );
  }
  