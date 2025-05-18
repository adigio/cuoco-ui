// components/Navbar.js
"use client";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link';
import Router from 'next/router';
export default function NavbarHome() {
  return (
    <header className="bg-[#f37b6a] py-3">
      <div className="container mx-auto flex items-center justify-between px-4">
        {/* Logo */}
        <div className="flex items-center space-x-2">
            <img
            src={"/logos/logo-blanco.png"}
            alt="Comida casera"
            className="w-10 h-10 object-contain"
          />
        </div>

        {/* Menu */}
        <nav className="flex items-center space-x-6 text-white text-sm">
          <Link href="/recipe-generator" className="hover:underline">Generar Recetas</Link>
          <Link href="/favoritos" className="hover:text-red-200">Favoritos</Link>
          <Link href="/perfil" className="hover:text-red-200">Perfil</Link>
          <Link href="/logout" className="hover:text-red-200"><FontAwesomeIcon icon={faSignOutAlt} /></Link>
        </nav>
      </div>
    </header>
  );
}
