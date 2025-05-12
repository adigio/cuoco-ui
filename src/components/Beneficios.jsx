import CardBeneficios from "./CardBeneficios";
export default function Beneficios() {
  return (
    <section  className="min-h-[70vh] w-full bg-purple-200 py-8 px-4 flex flex-col items-center">
      <div className="container mx-auto ">
        <h2 className="text-center text-5xl  mb-8 font-bold">Beneficios</h2>

      <h3 className="text-center text-3xl  mb-8 ">Tu cocina más eficiente: menos desperdicio, más sabor</h3>
        {/* Contenedor con grid res ponsivo */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"> 
          <CardBeneficios 
            img="/heladera confundida.jpg"
            imgAlt="Find Freezer" 
            title="¿Qué cocino hoy?"
            subtit="Recetas que usan lo que ya tenés" 
          />
          <CardBeneficios 
            img="/escaneo de heladera.webp"
            imgAlt="Scan" 
            title="Usá lo que ya tenés"
            subtit="Subí una foto, la IA hace el resto" 
          />
          <CardBeneficios 
            img="/plato.jpeg"
            imgAlt="dish" 
            title="Menos desperdicio"
            subtit="Aprovechá al máximo tu despensa" 
          />
          <CardBeneficios 
            img="/comiendo.jpg"
            imgAlt="dish" 
            title="Cociná sin estrés"
            subtit="Rápido, rico y sin vueltas" 
          /> 
        </div>
        <h3 className="text-center text-3xl pt-8 mb-8 ">Recetas listas al instante con lo que ya tenés en la heladera</h3>
      </div>
    </section>
  );
}
