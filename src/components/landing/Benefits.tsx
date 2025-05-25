import BenefitCard, {
  BenefitCardProps,
} from "@/components/landing/BenefitCard";

interface BenefitsProps {
  items: BenefitCardProps[];
}

export default function Benefits({ items }: BenefitsProps) {
  return (
    <section
      id="beneficios"
      className="w-full min-h-[80vh] bg-purple-200 py-25 md:py-8 md:pt-20 px-4 flex flex-col items-center"
    >
      <div className="container mx-auto ">
        <h2 className="text-center text-3xl  mb-4 font-bold">
          Como funciona ?
        </h2>

        <div className="flex flex-wrap justify-center gap-6">
          {items.map((benefit, index) => (
            <BenefitCard
              key={index}
              img={benefit.img}
              imgAlt={benefit.imgAlt}
              title={benefit.title}
              subtitle={benefit.subtitle}
            />
          ))}
        </div>
        <p className="text-center text-gray-700 text-lg mt-10 max-w-3xl mx-auto">
          Con Cuoco, cocinar ya no es un problema: aprovechá lo que tenés,
          descubrí nuevas recetas y hacelo todo sin desperdiciar ni complicarte.
          ¡Empezá hoy a cocinar diferente!
        </p>
      </div>
    </section>
  );
}
