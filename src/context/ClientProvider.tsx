"use client";

import { Props } from "next/script";
import { useEffect, useState } from "react";
import ChefLoader from "@/components/shared/loaders/ChefLoader";
export default function ClientProvider({ children }: Props) {
  const [mswReady, setMswReady] = useState(process.env.NODE_ENV !== 'development');

  useEffect(() => {
    const initMSW = async () => {
      try {
        console.log("[MSW] Iniciando worker...");
        const { worker } = await import("@/mocks/browser");
        await worker.start({ onUnhandledRequest: "bypass" });
        console.log("[MSW] Worker iniciado correctamente");
        setMswReady(true); // ⚠️ Solo cuando el worker está listo
      } catch (error) {
        console.error("[MSW] Error al iniciar el worker:", error);
        setMswReady(true); // Para que al menos la app no se quede colgada
      }
    };

    if (process.env.NODE_ENV === 'development') {
      initMSW();
    }
  }, []);

  // ⛔️ No renderizar children hasta que MSW esté iniciado
  if (!mswReady) {
   return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <ChefLoader />
        <p className="mt-4 text-gray-600">Cargando entorno simulado...</p>
      </div>
    );
  }

  return <>{children}</>;
}
