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
          <h1 className="text-3xl md:text-5xl font-bold text-gray-700 leading-tight">  
            Usá lo que tenés
            <span className="text-red-500 block">
              cociná lo que querés
            </span>
          </h1>
          <p className="mt-4 text-lg md:text-2xl font-bold text-gray-600 mr-11">
            La app que transforma lo que ya tenés en casa en comidas ricas, sin estrés ni desperdicio ¡Cociná sin pensarlo!   
          </p>
          <p className="mt-30 text-lg md:text-xl  text-gray-700">
            ¿Querés recibir la app antes que nadie?
          </p>
          <p className="text-lg md:text-xl  text-gray-700">
            Dejanos tu mail y enterate cuando lanzamos
          </p>
          <div className="mt-10 flex items-center gap-4">
            <input type="email" placeholder="Email" className="w-70 rounded-lg border border-gray-300 p-4 text-lg" />
            <button className="bg-green-500 hover:bg-red-600 text-white text-lg font-semibold py-3 px-6 rounded-lg shadow-lg transition"> 
              Sumarme!
            </button>
          </div>
          <small className="mt-4 italic text-xs text-gray-500">
            No mandamos spam. Solo te avisamos cuando Planicocina esté lista para vos.        
          </small>
        </div>
      </div>
    </div>
  );
}
