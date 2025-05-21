"use client";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link';

export default function NavbarHome() {
  return (
    <header className="bg-[#f37b6a] py-3">
      <div className="container mx-auto flex items-center justify-between px-4">
        <Link href="/home">
          <div className="flex items-center space-x-2">
            <img
              src={"/logos/logo-blanco.png"}
              alt="Comida casera"
              className="w-10 h-10 object-contain"
            />
          </div>
        </Link>
        <nav className="flex items-center space-x-6 text-white text-sm">
          <Link href="/recipe-generator" className="hover:text-red-200">Generar Recetas</Link>
          <Link href="/favs" className="hover:text-red-200">Favoritos</Link>
          <Link href="/profile" className="hover:text-red-200">Perfil</Link>
          <Link href="/logout" className="hover:text-red-200"><FontAwesomeIcon icon={faSignOutAlt} /></Link>
        </nav>

      </div>
    </header>
  );
}
