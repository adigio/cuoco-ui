import { Montserrat } from "next/font/google";
import "./globals.css";
import { LayoutProps } from "@/types/layout";
import "@fortawesome/fontawesome-svg-core/styles.css";
import { config } from "@fortawesome/fontawesome-svg-core";
config.autoAddCss = false;

import "@/lib/fontawesome";
import ClientProvider from "@/context/ClientProvider"; 

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["200", "400", "500", "600", "700", "800"],
  variable: "--font-montserrat",
});

export const metadata = {
  title: "Cuoco",
  description: "Arma tu próxima comida como un chef",
};

export default function RootLayout({ children }: LayoutProps) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="favicon/favicon.ico" />
      </head>
      <body className={`${montserrat.variable}`}>
        <ClientProvider>{children}</ClientProvider>
      </body>
    </html>
  );
}
