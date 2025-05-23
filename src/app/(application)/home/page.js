'use client';

import HeroHome from "@/components/home/HeroHome";
import InspiracionTitulo from "@/components/home/InspiracionTitulo";
import CardsInspiracion from "@/components/home/CardsInspiracion";

export default function Home() {
  return (
    <main className="pt-16 md:pt-0 flex flex-col items-center">
      <HeroHome />
      <InspiracionTitulo />
      <CardsInspiracion />
    </main>
  );
}
