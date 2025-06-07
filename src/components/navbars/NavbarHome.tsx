"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import LogoutButton from "./LogoutButton";
export default function NavbarHome() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 w-full z-50 py-4 px-8 background-color-primary shadow transition-all duration-300">
      <div className="flex justify-between items-center">
        <Link href="/">
          <div className="flex items-center gap-2 text-3xl text-white">
            <Image
              src="/logos/logo-blanco.png"
              alt="Logo principal"
              width={40}
              height={40}
              className="object-contain"
            />
          </div>
        </Link>

        {/* Hamburger button */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="lg:hidden p-2 focus:outline-none z-50"
        >
          <div className="space-y-1.5 w-6">
            <span
              className={`block h-[2px] w-6 bg-white transition-transform duration-300 ${
                isMenuOpen ? "rotate-45 translate-y-2" : ""
              }`}
            />
            <span
              className={`block h-[2px] w-6 bg-white transition-opacity duration-300 ${
                isMenuOpen ? "opacity-0" : ""
              }`}
            />
            <span
              className={`block h-[2px] w-6 bg-white transition-transform duration-300 ${
                isMenuOpen ? "-rotate-45 -translate-y-2" : ""
              }`}
            />
          </div>
        </button>

        {/* Desktop menu */}
        <div className="hidden lg:flex items-center space-x-6 text-black font-bold">
          <Link href="/home" className="hover:text-red-200">Generar Recetas</Link>
          <Link href="/favs" className="hover:text-red-200">Favoritos</Link>
          <Link href="/calendar" className="hover:text-red-200">Calendario</Link>
          <Link href="/profile" className="hover:text-red-200">Perfil</Link>
          <LogoutButton/>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={`lg:hidden absolute left-0 right-0 p-6 bg-white shadow-lg transition-all duration-300 ${
          isMenuOpen
            ? "top-full opacity-100 visible"
            : "top-[110%] opacity-0 invisible"
        }`}
      >
        <Link
         href="/home" 
          className="block text-center font-bold text-red-400 hover:text-red-600 mb-4"
          onClick={() => setIsMenuOpen(false)}
        >
          Generar Recetas
        </Link>
        <Link
          href="/favs" 
          className="block text-center font-bold text-red-400 hover:text-red-600 mb-4"
          onClick={() => setIsMenuOpen(false)}
        >
         Favoritos
        </Link>
        <Link
          href="/calendar" 
          className="block text-center font-bold text-red-400 hover:text-red-600 mb-4"
          onClick={() => setIsMenuOpen(false)}
        >
          Calendario
        </Link>
        <Link
          href="/profile" 
          className="block text-center font-bold bg-red-400 text-white px-6 py-2 rounded-lg hover:bg-red-500 transition-all duration-300"
          onClick={() => setIsMenuOpen(false)}
        >
          Perfil
        </Link>
      </div>
    </nav>
  );
}
