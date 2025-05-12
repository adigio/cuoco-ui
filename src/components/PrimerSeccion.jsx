export default function PrimerSeccion() {
  return (
    <div className="relative w-full h-[60vh] md:h-[80vh] lg:h-screen">
      <img
        src="/imagen_landing_principal.png"
        alt="Comida"
        className="w-full h-full object-cover"
      />
      <div className="absolute inset-0 flex items-center">
        <div className="text-left pl-20  max-w-3xl">
          <h1 className="text-3xl md:text-7xl font-bold text-gray-800 leading-tight">
            Usá lo que tenés cociná lo que querés
          </h1>
          <p className="mt-4 text-lg md:text-2xl font-bold text-gray-700">
            Cargá fotos de tus productos o ingresalos manualmente y te mostramos recetas que podés hacer con lo que tenés.
          </p>
          <p className="mt-30 text-lg md:text-xl  text-gray-700">
          ¿Querés recibir la app antes que nadie? Dejanos tu mail y enterate cuando lanzamos
          </p>
          <button className="mt-6 bg-red-500 hover:bg-red-600 text-white text-lg font-semibold py-3 px-6 rounded-lg shadow-lg transition">
            ¡Hora de cocinar!
          </button>
        </div>
      </div>
    </div>
  );
}
