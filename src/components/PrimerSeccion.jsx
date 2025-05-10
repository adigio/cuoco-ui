export default function PrimerSeccion() {
  return (
    <div className="relative w-full"> 
      <img
        src="/imagen_landing_principal.png" // Ruta de la imagen en la carpeta /public
        alt="Comida"
        className="w-full h-full object-cover" // Asegura que la imagen ocupe toda la pantalla
      />
      <div className="absolute top-14/20 left-1/4 transform -translate-x-1/4 -translate-y-1/2"> 
  <div className="flex items-center  border-teal-500 py-2">
    <button className="flex-shrink-0 bg-red-300 hover:bg-red-400 border-red-300 hover:border-red-400 text-sm border-4 text-white py-1 px-2 rounded" type="button">
      Hora de cocinar!
    </button> 
  </div> 
      </div>
    </div>
  );
}
