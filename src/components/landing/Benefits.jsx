import BenefitCard from "@/components/landing/BenefitCard";

export default function Benefits({ items }) {
  return (
    <section  className="w-full min-h-[80vh] bg-purple-200 py-25 md:py-8 md:pt-20 px-4 flex flex-col items-center">
      <div className="container mx-auto ">
        <h2 className="text-center text-3xl  mb-4 font-bold">Beneficios</h2>

        <h3 className="text-right text-lg font-bold text-white"> <span className="w-40"> Tu cocina más eficiente, menos desperdicio, más sabor </span></h3>
        <h3 className="text-left font-bold text-white text-lg">Recetas listas al instante con lo que ya tenés en la heladera</h3>  

        <div className="flex flex-wrap justify-center">
          {
            items.map((benefit, index) => (
              <BenefitCard
                key={index}
                img={benefit.img}
                imgAlt={benefit.imgAlt}
                title={benefit.title}
                subtitle={benefit.subtitle}
              />
            ))
          }
        </div>
      </div>
    </section>
  );
}
