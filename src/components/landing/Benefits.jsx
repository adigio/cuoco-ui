import BenefitCards from "@/components/landing/BenefitCards";

export default function Benefits() {
  return (
    <section  className="w-full min-h-[80vh] bg-purple-200 py-25 md:py-8 md:pt-20 px-4 flex flex-col items-center">
      <div className="container mx-auto ">
        <h2 className="text-center text-3xl  mb-4 font-bold">Beneficios</h2>

        <h3 className="text-right text-lg font-bold text-white"> <span className="w-40"> Tu cocina más eficiente, menos desperdicio, más sabor </span></h3>
        <h3 className="text-left font-bold text-white text-lg">Recetas listas al instante con lo que ya tenés en la heladera</h3>  

        <div className="flex flex-wrap justify-center">
          <BenefitCards
            img="/heladera_confundida.jpg"
            imgAlt="Find Freezer" 
            title="¿Qué cocino hoy?"
            subtitle="Recetas que usan lo que ya tenés"
          />
          <BenefitCards
            img="/escaneo_heladera.webp"
            imgAlt="Scan" 
            title="Usá lo que ya tenés"
            subtitle="Subí una foto, la IA hace el resto"
          />
          <BenefitCards
            img="/plato.jpeg"
            imgAlt="dish" 
            title="Menos desperdicio"
            subtitle="Aprovechá al máximo tu despensa"
          />
          <BenefitCards
            img="/comiendo.jpg"
            imgAlt="dish" 
            title="Cociná sin estrés"
            subtitle="Rápido, rico y sin vueltas"
          />
        </div>
      </div>
    </section>
  );
}
