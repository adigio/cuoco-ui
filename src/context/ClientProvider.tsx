"use client"; // Esto es clave para que solo corra en el cliente

import { Props } from "next/script";
import { useEffect } from "react";
export default function ClientProvider({ children }: Props) {
  useEffect(() => {
    const initMSW = async () => {
      try {
        console.log("[MSW] Iniciando worker...");
        const { worker } = await import("@/mocks/browser");
        await worker.start({ 
          onUnhandledRequest: "bypass",
        });
        console.log("[MSW] Worker iniciado correctamente");
      } catch (error) {
        console.error("[MSW] Error al iniciar el worker:", error);
      }
    };

    // En desarrollo, siempre iniciamos MSW
    if (process.env.NODE_ENV === 'development') {
      initMSW();
    }
  }, []);

  return children;
}
