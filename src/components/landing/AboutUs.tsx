import Image from "next/image";

export default function AboutUs() {
  return (
    <section className="relative bg-white py-20 px-4 md:px-20 overflow-hidden" id="aboutUs">
      {/* Línea divisoria superior */}
      <div className="border-t-2 text-color-primary mb-10"></div>

      {/* Contenido principal */}
      <div className="relative z-10 max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-12">
        {/* Imagen de comida */}
        <div className="w-full md:w-1/2 flex justify-center">
          <div className="relative w-full max-w-lg	 aspect-square rounded-[40px] overflow-hidden">
            <Image
              src="/aboutUs.jpeg"
              alt="Cuoco-team"
              fill
              className="object-cover object-center"
              sizes="(max-width: 768px) 100vw, 300px"
            />
          </div>
        </div>

        {/* Texto */}
        <div className="w-full md:w-1/2 text-gray-800">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            ¿Quiénes somos detrás de Cuoco?
          </h2>
          <p className="text-lg mb-4">
            Somos una aplicación desarrollada por estudiantes de la Universidad Nacional de La Matanza con el objetivo de ayudarte a aprovechar mejor tus alimentos, ahorrar tiempo y disfrutar de la comida casera sin complicarte.
          </p>
          <p className="text-lg mb-4">
            Creemos que cocinar no tiene que ser difícil. Por eso hicimos una app que piensa con vos, no por vos.
          </p>
          <p className="text-xl italic font-semibold text-[#f37b6a]">
            <span className="not-italic font-bold text-[#f37b6a]">Cuoco</span> es mucho más que recetas.<br />
            Es una forma de reconectar con lo que comemos.<br />
            ¿Nos acompañás?
          </p>
        </div>
      </div>
    </section>
  );
}
