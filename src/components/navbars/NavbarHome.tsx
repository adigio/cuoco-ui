"use client";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link';
import LogoutButton from './LogoutButton';
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
              <img
                src="/logos/iso-blanco.png"
                alt="Logo secundario"
                className="w-15 h-15 object-contain transition-opacity duration-300"
              />
          </div>
        </Link>
        <nav className="flex items-center space-x-6 text-white font-bold text-l">
          <Link href="/home" className="hover:text-red-200">Generar Recetas</Link>
          <Link href="/favs" className="hover:text-red-200">Favoritos</Link>
          <Link href="/calendar" className="hover:text-red-200">Calendario</Link>
          <Link href="/profile" className="hover:text-red-200">Perfil</Link>
          <LogoutButton/>
        </nav>

      </div>
    </header>
  );
}
