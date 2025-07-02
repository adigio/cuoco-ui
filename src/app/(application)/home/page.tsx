'use client';

import HeroHome from "@/components/home/HeroHome";
import InspiracionTitulo from "@/components/home/InspiracionTitulo";
import CardsInspiracion from "@/components/home/CardsInspiracion";
import { useRecipeGeneratorSession } from "@/hooks/useRecipeGeneratorSession";

export default function Home() {
  // Esto limpia automáticamente los ingredientes cuando sales del flujo del generador
  useRecipeGeneratorSession();

  return (
    <main className="pt-16 md:pt-0 flex flex-col items-center">
      <HeroHome />
      <InspiracionTitulo />
      <CardsInspiracion />
    </main>
  );
}
