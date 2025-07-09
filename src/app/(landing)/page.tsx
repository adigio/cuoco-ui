"use client";
import AboutUs from "@/components/landing/AboutUs";
import StepSection from "@/components/landing/StepSection";
import Header from "@/components/landing/Header";
import { StepSectionProps } from "@/types/components/landing.types";
import { useAuthStore } from "@/store/useAuthStore";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
const LandingSections: StepSectionProps[] = [
  {
    id: "escaneo",
    step: 1,
    image: "/heladera.png",
    imageAlt: "Escaneo de heladera con IA",
    title: "Mostrá lo que tenés en tu heladera o alacena",
    subtitle: [
      "¿Tenés una heladera medio vacía y cero ideas?",
      "En Cuoco podés subir una foto o anotar lo que encontraste en tu heladera o alacena",
      "Nuestra IA detecta automáticamente los ingredientes y te sugiere recetas realistas, caseras y adaptadas a vos. Ya no hace falta improvisar o salir a comprar",
    ],
    buttonText: "Probar con mis ingredientes",
    //buttonLink: "/recipe-generator",
  },
  {
    id: "recetas",
    step: 2,
    image: "/cocinacelu.png",
    imageAlt: "Plato sugerido por la app",
    title: "Te sugerimos recetas con lo que encontrás",
    subtitle: [
      "Olvidate de las recetas imposibles",
      "Cuoco te recomienda solo platos que podés hacer ahora, en función de tus gustos, alergias o estilo alimentario",
      "Vegano, sin gluten, sin lactosa, lo que necesites. Vos elegís cómo querés comer, Cuoco se adapta a vos",
    ],
    buttonText: "Completá tu perfil ahora",
    // buttonLink: "/signin",
  },
  {
    id: "resultado",
    step: 3,
    image: "/mealprep 1.png",
    imageAlt: "Persona comiendo comida casera",
    title: "Listo. Rápido, fácil y sin desperdicio",
    subtitle: [
      "¿Querés cocinar varias recetas en un solo día y olvidarte toda la semana?",
      "Cuoco te sugiere combinaciones inteligentes para cocinar en lotes (batch cooking) con lo que tenés",
      "Preparás todo de una, organizás mejor tu tiempo, y ahorrás un montón",
    ],
    buttonText: "Empezar a cocinar",
    // buttonLink: "/recipe-generator",
  },
  {
    id: "favoritos",
    step: 4,
    image: "/comiendo.jpg",
    imageAlt: "Persona comiendo comida casera",
    title: "Volvé a tus favoritas cuando quieras",
    subtitle: [
      "¿Te encantó un plato?",
      "Guardalo con un solo clic",
      "Cuoco te permite armar tu recetario personal para que cada vez que cocines, tengas a mano tus hits",
      "Nada se pierde, todo se guarda. Y si tenés el plan Premium, tus filtros y recetas se conservan siempre",
    ],
    buttonText: "Empezar a cocinar",
    //buttonLink: "/recipe-generator",
  },
];

export default function LandingPage() {
  const user = useAuthStore((state) => state.user);
  const router = useRouter();
  useEffect(() => {
    if (user) {
      router.replace("/home");
    }
  }, [user, router]);
  return (
    <main className="pt-16 md:pt-0 flex flex-col items-center">
      <Header />

      {/* Roadmap de fondo solo en desktop */}
      <section className="relative w-full bg-white py-24 px-4 md:px-8 overflow-visible ">
        <div className="relative z-10 max-w-7xl mx-auto flex flex-col">
          {LandingSections.map((section, index) => (
            <StepSection
              key={index}
              step={section.step}
              title={section.title}
              subtitle={section.subtitle}
              image={section.image}
              imageAlt={section.imageAlt}
              buttonText={section.buttonText}
              reverse={index % 2 !== 0}
              buttonLink={section.buttonLink}
              id={section.id}
            />
          ))}
        </div>
      </section>

      <AboutUs />
    </main>
  );
}
