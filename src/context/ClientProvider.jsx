"use client"; // Esto es clave para que solo corra en el cliente

import { useEffect } from "react";

export default function ClientProvider({ children }) {
    useEffect(() => {
        console.log("[MSW] Bloque de arranque en ClientProvider");

        if (process.env.NODE_ENV === "development") {
            console.log("[MSW] Ambiente desarrollo detectado");

            import("@/mocks/browser")
                .then(({ worker }) => {
                    console.log("[MSW] Worker importado correctamente");
                    return worker.start({ onUnhandledRequest: "bypass" });
                })
                .then(() => {
                    console.log("[MSW] Mocking enabled.");
                })
                .catch((err) => {
                    console.error("❌ MSW init error:", err);
                });
        } else {
            console.log("[MSW] No se inicializa porque no es desarrollo");
        }
    }, []);

    return children;
}
