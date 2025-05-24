'use client';
import { useRouter } from 'next/navigation';

 
export default function Header() {
  const router = useRouter(); 
  return (
    <div className="relative w-full h-[80vh] md:h-[80vh] lg:h-screen mt-17 md:mt-0">
      <img
        src="landing/imagen_landing_principal.png"
        alt="Comida"
        className="hidden md:block w-full h-full object-cover"
      />
      <img
        src="landing/imagen_landing_principal_mobile.png"
        alt="Comida"
        className="block sm:hidden w-full h-full object-cover"
      />
      <div className="absolute inset-0 flex items-start md:items-center">
        <div className="text-left px-4 md:pl-20 pb-[30%] md:pb-0 sm:pt-0 w-full md:w-[45%] lg:w-[45%]">  
          <h1 className="text-3xl md:text-5xl font-bold text-gray-700 leading-tight">  
            Usá lo que tenés
            <span className="text-red-400 block">
              cociná lo que querés
            </span>
          </h1>
          <p className="mt-4 text-md md:text-2xl font-bold text-gray-600 mb-6 md:mb-0">
            La app que transforma lo que ya tenés en casa en comidas ricas, sin estrés ni desperdicio ¡Cociná sin pensarlo!   
          </p>
          {/* <div className="mt-4 md:mt-30">
            <p className="text-md md:text-xl text-gray-700">
             
            </p>
            <p className="text-md md:text-xl text-gray-700">
              
            </p>
          </div>
          <div className="mt-7 md:mb-0 mb-5 md:mt-5 flex flex-col sm:flex-row gap-3">
          {/* Aqui primero hay que constatar de que este logeado, si lo esta va a recipe-generator, sino al log/registrarse */}
            <button 
                  onClick={() => router.push('/recipe-generator')}
            className="w-full sm:w-auto bg-green-400 hover:bg-red-400 text-white text-lg font-semibold py-3 px-6 rounded-lg shadow-lg transition"> 
              Hora de Cocinar!
            </button>
          </div>
         
        </div>
      </div> 
  );
}
