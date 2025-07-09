"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useAuthStore } from "@/store/useAuthStore";
import { useIngredientsStore } from "@/store/useIngredientsStore";
import { useRouter } from "next/navigation";
import FastRecipeModal from "../shared/modal/FastRecipeModal";

export default function HeroHome() {
  const [saludo, setSaludo] = useState("");
  const [showFastRecipeModal, setShowFastRecipeModal] = useState(false);
  const user = useAuthStore((state) => state.user?.name);
  const isPremium = useAuthStore((state) => state.user?.premium);
  const setMode = useIngredientsStore((state) => state.setMode);
  const router = useRouter();
 
  const handleClick = (mode: "meal-prep" | "cook-now") => {
    setMode(mode);
    router.push("/recipe-generator");
  };

  useEffect(() => {
    const ahora = new Date();
    const hora = ahora.getHours();
    let nuevoSaludo = "";

    if (hora >= 6 && hora < 12) {
      nuevoSaludo = "¡Buenos días";
    } else if (hora >= 12 && hora < 19) {
      nuevoSaludo = "¡Buenas tardes";
    } else {
      nuevoSaludo = "¡Buenas noches";
    }

    setSaludo(`${nuevoSaludo}, ${user}!`);
  }, [user]);



  return (
    <div className="relative w-full h-[80vh] bg-white pt-24 overflow-hidden">
      {/* Imagen PNG única como fondo */}
      <Image
        src="/HeroImageHome.png"
        alt="Vegetales decorativos"
        layout="fill"
        objectFit="cover"
        className="z-0"
        priority
      />

      {/* Contenido centrado */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-4">
        <h1 className="text-black text-3xl md:text-5xl font-semibold mb-6">
          {saludo}
        </h1>
        <div className="flex flex-col gap-y-4 lg:flex-row lg:gap-x-4 lg:gap-y-0">
          <button
            className="w-full lg:w-auto px-6 py-3 background-color-primary text-white rounded-lg hover:brightness-90 transition"
            onClick={() => setShowFastRecipeModal(true)}
          >
            Receta Rápida
          </button>

          <Link href="recipe-generator">
            <button className="w-full lg:w-auto px-6 py-3 background-color-primary text-white rounded-lg hover:brightness-90 transition">
              Empezá a cocinar con lo que tenés
            </button>
          </Link>

          <div className="relative inline-block w-full lg:w-auto">
            {!isPremium && (
              <span className="absolute -top-2 -right-2 bg-yellow-500 text-white text-xs px-2 py-0.5 rounded-full shadow">
                Premium
              </span>
            )}
            <button
              onClick={() => handleClick("meal-prep")}
              disabled={!isPremium}
              className={`w-full lg:w-auto px-6 py-3 rounded-lg transition ${
                isPremium
                  ? "background-color-primary text-white hover:brightness-90"
                  : "bg-gray-400 text-gray-200 cursor-not-allowed"
              }`}
            >
              Meal Prep
            </button>
          </div>
        </div>
      </div>

      <FastRecipeModal
        isOpen={showFastRecipeModal}
        onClose={() => setShowFastRecipeModal(false)}
      />
    </div>
  );
}
