import { Montserrat } from "next/font/google";
import "./globals.css";

import "@fortawesome/fontawesome-svg-core/styles.css";
import { config } from "@fortawesome/fontawesome-svg-core";
config.autoAddCss = false;

import "@/lib/fontawesome";

// 🧪 MSW: inicio del bloque
if (typeof window !== "undefined") {
  console.log("[MSW] Bloque de arranque en layout.js");

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
}
// 🧪 MSW: fin del bloque

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["200", "400", "500", "600", "700", "800"],
  variable: "--font-montserrat",
});

export const metadata = {
  title: "Cuoco",
  description: "Arma tu próxima comida como un chef",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="favicon/favicon.ico" />
      </head>
      <body className={`${montserrat.variable}`}>{children}</body>
    </html>
  );
}
