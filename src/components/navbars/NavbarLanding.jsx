"use client";
import Link from "next/link";
import { useState, useEffect} from "react";


export default function NavbarLanding() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);


  return (
    <nav  className={`fixed top-0 left-0 w-full z-50 py-4 px-8 transition-all duration-300 ${
        scrolled ? "background-color-nav-scrolled shadow text-red-400" : "bg-transparent text-white"
        }`}>
      <div className="flex justify-between items-center">
        <div className={`text-3xl font-bold ${scrolled ? "text-red-400" : "text-white"}`}>
          <img
            src={scrolled ? "/logos/logo-blanco.png" : "/logos/logo-rosa.png"}
            alt="Comida casera"
            className="w-10 h-10 object-contain"
          />
        </div>
        <div className="space-x-6 text-white">
          <Link href="/beneficios" className="hover:text-gray-400">
            Beneficios
          </Link>
          <Link href="/sobre-nosotros" className="hover:text-gray-400">
            Sobre nosotros
          </Link>
          <Link href="/iniciar-sesion" className="hover:text-gray-400">
            Iniciar Sesión
          </Link>
          <Link
            href="/registrarse"
            className="bg-white text-red-400 px-6 py-2 rounded-lg hover:bg-red-500 hover:text-white transition-all duration-300"
          >
            Registrarse
          </Link>
        </div>
      </div>
    </nav>
  );
}
