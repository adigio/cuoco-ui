export default function Header() {
  return (
    <div className="relative w-full h-[80vh] md:h-[80vh] lg:h-screen mt-17 md:mt-0">
      <img
        src="landing/imagen_landing_principal.png"
        alt="Comida"
        className="hidden sm:block w-full h-full object-cover"
      />
      <img
        src="landing/imagen_landing_principal_mobile.png"
        alt="Comida"
        className="block sm:hidden w-full h-full object-cover"
      />
      <div className="absolute inset-0 flex items-start md:items-center">
        <div className="text-left px-4 md:pl-20 max-w-3xl pb-[30%] md:pb-0 sm:pt-0"> 
          <h1 className="text-3xl md:text-5xl font-bold text-gray-700 leading-tight">  
            Usá lo que tenés
            <span className="text-red-500 block">
              cociná lo que querés
            </span>
          </h1>
          <p className="mt-4 text-md md:text-2xl font-bold text-gray-600 mb-6 md:mb-0">
            La app que transforma lo que ya tenés en casa en comidas ricas, sin estrés ni desperdicio ¡Cociná sin pensarlo!   
          </p>
          <div className="mt-4 md:mt-30">
            <p className="text-md md:text-xl text-gray-700">
              ¿Querés recibir la app antes que nadie?
            </p>
            <p className="text-md md:text-xl text-gray-700">
              Dejanos tu mail y enterate cuando lanzamos
            </p>
          </div>
          <div className="mt-7 md:mb-0 mb-5 md:mt-10 flex flex-col sm:flex-row gap-3">
            <input 
              type="email" 
              placeholder="Email" 
              className="w-full sm:w-70 rounded-lg border border-red-400 md:border-gray-300 placeholder-gray-400 bg-transparent md:bg-white p-3 md:p-4 text-lg text-white md:text-gray-700" 
            />
            <button className="w-full sm:w-auto bg-green-500 hover:bg-red-600 text-white text-lg font-semibold py-3 px-6 rounded-lg shadow-lg transition"> 
              Sumarme!
            </button>
          </div>
          <small className="block mt-2 italic text-xs text-white md:text-gray-500">
            No mandamos spam. Solo te avisamos cuando Planicocina esté lista para vos.        
          </small>
        </div>
      </div>
    </div>
  );
}
