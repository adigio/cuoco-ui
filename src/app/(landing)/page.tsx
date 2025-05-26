import AboutUs from "@/components/landing/AboutUs"; 
import StepSection from "@/components/landing/StepSection";
import Header from "@/components/landing/Header"; 

const seccionesLanding = [
  {
    id: "escaneo",
    paso: 1,
    imagen: "/heladera.png",
    alt: "Escaneo de heladera con IA",
    titulo: "Mostrá lo que tenés en tu heladera o alacena.",
    subtitulo: `¿Tenés una heladera medio vacía y cero ideas?

En Cuoco podés subir una foto o anotar lo que encontraste en tu heladera o alacena.

Nuestra IA detecta automáticamente los ingredientes y te sugiere recetas realistas, caseras y adaptadas a vos.
Ya no hace falta improvisar o salir a comprar.`,
    boton: "Probar con mis ingredientes",
  },
  {
    id: "recetas",
    paso: 2,
    imagen: "/cocinacelu.png",
    alt: "Plato sugerido por la app",
    titulo: "Te sugerimos recetas con lo que encontrás.",
    subtitulo: `Olvidate de las recetas imposibles.

Cuoco te recomienda solo platos que podés hacer ahora, en función de tus gustos, alergias o estilo alimentario.

Vegano, sin gluten, sin lactosa, lo que necesites.
Vos elegís cómo querés comer, Cuoco se adapta a vos.`,

    boton: "Completá tu perfil ahora",
  },
  {
    id: "resultado",
    paso: 3,
    imagen: "/mealprep 1.png",
    alt: "Persona comiendo comida casera",
    titulo: "Listo. Rápido, fácil y sin desperdicio.",
    subtitulo: `¿Querés cocinar varias recetas en un solo día y olvidarte toda la semana?

Cuoco te sugiere combinaciones inteligentes para cocinar en lotes (batch cooking) con lo que tenés.

Preparás todo de una, organizás mejor tu tiempo, y ahorrás un montón.`,

    boton: "Empezar a cocinar",
  },
  {
    id: "resultado",
    paso: 4,
    imagen: "/comiendo.jpg",
    alt: "Persona comiendo comida casera",
    titulo: "Listo. Rápido, fácil y sin desperdicio.",
    subtitulo: `¿Te encantó un plato?

Guardalo con un solo clic.

Cuoco te permite armar tu recetario personal para que cada vez que cocines, tengas a mano tus hits.

Nada se pierde, todo se guarda.
Y si tenés el plan Premium, tus filtros y recetas se conservan siempre.`,

    boton: "Empezar a cocinar",
  },
];

export default function LandingPage() {
  return (
    <main className="pt-16 md:pt-0 flex flex-col items-center">
      <Header />

      {/* Roadmap de fondo solo en desktop */}
      <section className="relative w-full bg-white py-24 px-4 md:px-8 overflow-visible">
        

      <div className="relative z-10 max-w-7xl mx-auto flex flex-col">

          {seccionesLanding.map((seccion, index) => (
            <StepSection
              key={seccion.paso}
              step={seccion.paso}
              title={seccion.titulo}
              description={seccion.subtitulo}
              image={seccion.imagen}
              imageAlt={seccion.alt}
              buttonText={seccion.boton}
              reverse={index % 2 !== 0} 
            />
          ))}
        </div>
      </section>
 
      <AboutUs />
    </main>
  );
}
