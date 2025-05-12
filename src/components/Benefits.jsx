import TailwindSlider from "@/components/SliderLanding";

export default function Benefits() {
  return (
    <section  className="min-h-[70vh] w-full bg-purple-200 py-8 px-4 flex flex-col items-center">
      <div className="container mx-auto ">
      <h2 className="text-3xl md:text-5xl  text-center font-bold text-gray-700 leading-tight">  Beneficios</h2>

      <h3 className="text-right text-lg font-bold text-white mb-8"> <span className="w-40"> Tu cocina más eficiente, menos desperdicio, más sabor </span></h3>
        <div className="relative min-h-[510px] w-full max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-center pt-12 pb-0">
           <TailwindSlider />
        </div>
        <h3 className="text-left font-bold text-white text-lg">Recetas listas al instante con lo que ya tenés en la heladera</h3>  
      </div>
    </section>
  );
}
