"use client";

import Image from "next/image";
import Link from "next/link";
import axios from "axios";
import { useEffect, useState } from "react";
import { useAuthStore } from "@/store/useAuthStore";
import { useIngredientsStore } from "@/store/useIngredientsStore";
import { useRouter } from "next/navigation";
import ChefLoader from "../shared/loaders/ChefLoader";
import Modal from "../shared/modal/Modal";
import Input from "../shared/form/Input";
export default function HeroHome() {
  const [saludo, setSaludo] = useState("");
  const [fastRecipeName, setFastRecipeName] = useState("");
  const [ModalFastRecipe, setModalFastRecipe] = useState("");
  console.log(useAuthStore((state) => state.user?.name));
  const user = useAuthStore((state) => state.user?.name);
  const isPremium = useAuthStore((state) => state.user?.premium);
  const setMode = useIngredientsStore((state) => state.setMode);
  const router = useRouter();
  const [loading, setLoading] = useState(false);
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
  }, []);

  const handleSend = async () => {
    if (!fastRecipeName.trim()) return;

    setLoading(true); 
    try {
      const response = await axios.post("/api/getRecipe", {
        nombre: fastRecipeName,
      });

      // Suponiendo que la respuesta tiene un ID o algo para redireccionar
      const recipeId = response.data.id;

      // Cierra modal y redirige
      setModalFastRecipe("");
       router.push(`/recipe/${recipeId}`);
    } catch (error) {
      console.error("Error al enviar receta rápida:", error);
      // Aquí podrías mostrar una alerta al usuario
    } finally {
      setLoading(false);
    }
  };

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
        <div className="flex gap-x-4">
          <button
            className="px-6 py-3 background-color-primary text-white rounded-lg hover:brightness-90 transition"
            onClick={() => {
              setFastRecipeName("");
              setModalFastRecipe("open");
            }}
          >
            Receta Rápida
          </button>
          <Link href="recipe-generator">
            <button className="px-6 py-3 background-color-primary text-white rounded-lg hover:brightness-90 transition">
              Empezá a cocinar con lo que tenés
            </button>
          </Link>
          <div className="relative inline-block">
            {!isPremium && (
              <span className="absolute -top-2 -right-2 bg-yellow-500 text-white text-xs px-2 py-0.5 rounded-full shadow">
                Premium
              </span>
            )}

            <button
              onClick={() => handleClick("meal-prep")}
              disabled={!isPremium}
              className={`px-6 py-3 rounded-lg transition ${
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

      <Modal
        isOpen={ModalFastRecipe === "open"}
        onClose={() => setModalFastRecipe("")}
        showCloseButton={true}
      >
        <Modal
          isOpen={ModalFastRecipe === "open"}
          onClose={() => setModalFastRecipe("")}
          showCloseButton
        >
          {loading ? (
            <div className="flex flex-col items-center justify-center py-10">
              <ChefLoader />
              <p className="mt-4 text-gray-700">Preparando tu receta...</p>
            </div>
          ) : (
            <>
              <h2 className="text-xl font-bold mb-4">
                Elige una receta rápida
              </h2>

              <Input
                type="text"
                name="fastRecipe"
                label="Nombre de la receta"
                placeholder="Ej. Ensalada exprés"
                value={fastRecipeName}
                onChange={(e) => setFastRecipeName(e.target.value)}
                required
              />

              <button
                onClick={handleSend}
                className="mt-4 px-6 py-2 background-color-primary text-white rounded hover:bg-blue-700 transition"
              >
                Enviar
              </button>
            </>
          )}
        </Modal>
      </Modal>
    </div>
  );
}
