"use client";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";

export default function NavbarLanding() {
  const [scrolled, setScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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
    <nav
      className={`fixed top-0 left-0 w-full z-50 py-4 px-8 transition-all duration-300 ${
        scrolled
          ? "background-color-primary shadow text-red-400"
          : "bg-transparent text-white"
      }`}
    >
      <div className="flex justify-between items-center">
        <Link href="/">
          <div
            className={`text-3xl flex items-center gap-2 ${
              scrolled ? "text-red-400" : "text-white"
            }`}
          >
            {scrolled && (
              <Image
                src="/logos/logo-blanco.png"
                alt="Logo principal"
                width={40}
                height={40}
                className="object-contain"
              />
            )}
           
            {scrolled && (
              <Image
                src="/logos/iso-blanco.png"
                alt="Logo secundario"
                width={60}
                height={60}
                className="object-contain transition-opacity duration-300"
              />
            )}
          </div>
        </Link>
        {/* Botón para mobile  */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="lg:hidden focus:outline-none z-50 p-2"
        >
          <div className="space-y-1.5 w-6">
            <span
              className={`block w-6 h-[2px] transition-all duration-300 ${
                scrolled ? "bg-white" : "bg-red-400"
              } ${isMenuOpen ? "transform rotate-45 translate-y-2" : ""}`}
            ></span>
            <span
              className={`block w-6 h-[2px] transition-all duration-300 ${
                scrolled ? "bg-white" : "bg-red-400"
              } ${isMenuOpen ? "opacity-0" : ""}`}
            ></span>
            <span
              className={`block w-6 h-[2px] transition-all duration-300 ${
                scrolled ? "bg-white" : "bg-red-400"
              } ${isMenuOpen ? "transform -rotate-45 -translate-y-2" : ""}`}
            ></span>
          </div>
        </button>

        {/* Menu para desktop */}
        <div className="hidden lg:flex space-x-6 text-black font-bold flex items-center">
          <Link href="#beneficios" className={`hover:text-red-500`}>
            Beneficios
          </Link>
          <Link href="#aboutUs" className={`hover:text-red-500`}>
            Sobre nosotros
          </Link>
          <Link href="/signin" className={`hover:text-red-500`}>
            Iniciar Sesión
          </Link>
          <Link
            href="/signup"
            className={`"block px-6 py-2 rounded-lg ${
              scrolled
                ? "bg-white text-red-400"
                : "hover:bg-red-400 hover:shadow-lg hover:text-white bg-white text-red-400"
            }   transition-all duration-300"}`}
          >
            Registrarse
          </Link>
        </div>
      </div>

      {/* Menu mobile */}
      <div
        className={`lg:hidden absolute left-0 right-0 transition-all duration-300 ${
          isMenuOpen
            ? "top-full opacity-100 visible"
            : "top-[110%] opacity-0 invisible"
        }`}
      >
        <div
          className={`flex flex-col space-y-4 p-6 ${
            scrolled ? "bg-white shadow-lg" : "background-color-primary"
          }`}
        >
          <Link
            href="/beneficios"
            className={`text-center font-bold ${
              scrolled
                ? "text-red-400 hover:text-red-600"
                : "text-white hover:text-red-200"
            }`}
            onClick={() => setIsMenuOpen(false)}
          >
            Beneficios
          </Link>
          <Link
            href="/sobre-nosotros"
            className={`text-center font-bold ${
              scrolled
                ? "text-red-400 hover:text-red-600"
                : "text-white hover:text-red-200"
            }`}
            onClick={() => setIsMenuOpen(false)}
          >
            Sobre nosotros
          </Link>
          <Link
            href="/signin"
            className={`text-center font-bold ${
              scrolled
                ? "text-red-400 hover:text-red-600"
                : "text-white hover:text-red-200"
            }`}
            onClick={() => setIsMenuOpen(false)}
          >
            Iniciar Sesión
          </Link>
          <Link
            href="/signup"
            className={`text-center font-bold ${
              scrolled ? "bg-red-400 text-white" : "bg-white text-red-400"
            } px-6 py-2 rounded-lg hover:bg-red-500 hover:text-white transition-all duration-300`}
            onClick={() => setIsMenuOpen(false)}
          >
            Registrarse
          </Link>
        </div>
      </div>
    </nav>
  );
}
