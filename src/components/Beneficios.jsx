import CardBeneficios from "./CardBeneficios";
export default function Beneficios() {
  return (
    <section  className="min-h-[70vh] w-full bg-purple-200 py-8 px-4 flex flex-col items-center">
      <div className="container mx-auto ">
        <h2 className="text-center text-3xl  mb-4 font-bold">Beneficios</h2>

      <h3 className="text-right text-lg font-bold text-white mb-8"> <span className="w-40"> Tu cocina más eficiente, menos desperdicio, más sabor </span></h3>
        <div className="relative min-h-[510px] w-full max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-center pt-12 pb-0">
          <CardBeneficios
            img="/heladera confundida.jpg"
            imgAlt="Find Freezer" 
            title="¿Qué cocino hoy?"
            subtitle="Recetas que usan lo que ya tenés"
            position="md:absolute md:top-8 md:left-8"
          />
          <CardBeneficios
            img="/escaneo de heladera.webp"
            imgAlt="Scan" 
            title="Usá lo que ya tenés"
            subtitle="Subí una foto, la IA hace el resto"
            position="md:absolute md:top-48 md:left-64"
          />
          <CardBeneficios
            img="/plato.jpeg"
            imgAlt="dish" 
            title="Menos desperdicio"
            subtitle="Aprovechá al máximo tu despensa"
            position="md:absolute md:top-0 md:left-[34rem]"
          />
          <CardBeneficios
            img="/comiendo.jpg"
            imgAlt="dish" 
            title="Cociná sin estrés"
            subtitle="Rápido, rico y sin vueltas"
            position="md:absolute md:top-64 md:left-[40rem]"
          />
        </div>
        <h3 className="text-left font-bold text-white text-lg">Recetas listas al instante con lo que ya tenés en la heladera</h3>  
      </div>
    </section>
  );
}
