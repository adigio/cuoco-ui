"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

export default function HeroHome() {

      const [saludo, setSaludo] = useState("");

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

    setSaludo(`${nuevoSaludo}, Aldana!`);
  }, []);

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
        <button className="px-6 py-3 background-color-nav-scrolled text-white rounded-lg hover:bg-blue-700 transition">
          Empezá a cocinar con lo que tenés
        </button>
      </div>
    </div>
  );
}