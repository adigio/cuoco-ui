import { Montserrat } from "next/font/google";
import "../globals.css";
import NavbarLanding from "@/components/navbars/NavbarLanding";
import Footer from "@/components/landing/Footer";


const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["200", "400", "500", "600", "700", "800"],
  variable: "--font-montserrat",
});

export const metadata = {
  title: "Cuoco",
  description: "Arma tu proxima comida como un chef",
};

export default function LandingLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="favicon/favicon.ico" />
      </head>
      <body className={`${montserrat.variable}`}>
        <div className="min-h-screen overflow-x-hidden">
          <NavbarLanding />
          {children}
          <Footer/>
        </div>
      </body>
    </html>
  );
}
