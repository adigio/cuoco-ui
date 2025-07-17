'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import LogoutButton from './LogoutButton';
import SubscriptionModal from '../shared/modal/SubscriptionModal';
import { useAuthStore } from "@/store/useAuthStore";
import { useRouter } from "next/navigation";

export default function NavbarHome() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSubModalOpen, setIsSubModalOpen] = useState(false);
  const logout = useAuthStore((state) => state.logout);
  const isPremium = useAuthStore((state) => state.user?.premium);
  const active = useAuthStore((state) => state.user?.name);
  const router = useRouter();

  const handleCalendarClick = () => {
    if (isPremium) {
      window.location.href = '/calendar';
    } else {
      setIsSubModalOpen(true);
    }
  };

  const handleLogout = () => {
    logout();
    router.push("/");
  };

  return (
    <>
      <nav className="fixed top-0 left-0 w-full z-50 py-4 px-8 background-color-primary shadow transition-all duration-300">
        <div className="flex justify-between items-center">
          <Link href="/home">
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
                className={`block h-[2px] w-6 bg-white transition-transform duration-300 ${isMenuOpen ? 'rotate-45 translate-y-2' : ''}`}
              />
              <span
                className={`block h-[2px] w-6 bg-white transition-opacity duration-300 ${isMenuOpen ? 'opacity-0' : ''}`}
              />
              <span
                className={`block h-[2px] w-6 bg-white transition-transform duration-300 ${isMenuOpen ? '-rotate-45 -translate-y-2' : ''}`}
              />
            </div>
          </button>

          {/* Desktop menu */}
          <div className="hidden lg:flex items-center space-x-6 text-white font-bold">
            <Link href="/home" className="hover:text-red-200">Generar Recetas</Link>

            {/* Favoritos */}
            {isPremium ? (
              <Link href="/favs" className="hover:text-red-200">Favoritos</Link>
            ) : (
              <button
                onClick={() => setIsSubModalOpen(true)}
                className="relative hover:text-red-200"
              >
                <span className="absolute -top-2 left-1/2 transform -translate-x-1/2 text-[10px] bg-yellow-300 text-yellow-800 rounded px-1">
                  Premium
                </span>
                Favoritos
              </button>
            )}

            {/* Calendario */}
            {isPremium ? (
              <Link href="/calendar" className="hover:text-red-200 relative">
                Calendario
              </Link>
            ) : (
              <button
                onClick={handleCalendarClick}
                className="relative hover:text-red-200"
              >
                <span className="absolute -top-2 left-1/2 transform -translate-x-1/2 text-[10px] bg-yellow-300 text-yellow-800 rounded px-1">
                  Premium
                </span>
                Calendario
              </button>
            )}

            <Link href="/profile" className="hover:text-red-200">Perfil</Link>
            <LogoutButton />
          </div>
        </div>

        {/* Mobile menu */}
        <div
          className={`lg:hidden absolute left-0 right-0 p-6 bg-white shadow-lg transition-all duration-300 ${isMenuOpen ? 'top-full opacity-100 visible' : 'top-[110%] opacity-0 invisible'}`}
        >
          <Link
            href="/home"
            className="block text-center font-bold text-red-400 hover:text-red-600 mb-4"
            onClick={() => setIsMenuOpen(false)}
          >
            Generar Recetas
          </Link>

          {/* Favoritos Mobile */}
          {isPremium ? (
            <Link
              href="/favs"
              className="block text-center font-bold text-red-400 hover:text-red-600 mb-4"
              onClick={() => setIsMenuOpen(false)}
            >
              Favoritos
            </Link>
          ) : (
            <button
              onClick={() => { setIsSubModalOpen(true); setIsMenuOpen(false); }}
              className="block mx-auto font-bold text-red-400 hover:text-red-600 mb-4 relative"
            >
              <span className="absolute -top-2 left-1/2 transform -translate-x-1/2 text-[10px] bg-yellow-300 text-yellow-800 rounded px-1">
                Premium
              </span>
              Favoritos
            </button>
          )}

          {/* Calendario Mobile */}
          {isPremium ? (
            <Link
              href="/calendar"
              className="block text-center font-bold text-red-400 hover:text-red-600 mb-4 relative"
              onClick={() => setIsMenuOpen(false)}
            >
              Calendario
            </Link>
          ) : (
            <button
              onClick={() => { setIsSubModalOpen(true); setIsMenuOpen(false); }}
              className="block mx-auto font-bold text-red-400 hover:text-red-600 mb-4 relative"
            >
              <span className="absolute -top-2 left-1/2 transform -translate-x-1/2 text-[10px] bg-yellow-300 text-yellow-800 rounded px-1">
                Premium
              </span>
              Calendario
            </button>
          )}

          <Link
            href="/profile"
            className="block text-center font-bold text-red-400 hover:text-red-600 mb-4"
            onClick={() => setIsMenuOpen(false)}
          >
            Perfil
          </Link>
          <button
            onClick={handleLogout}
            className="block mx-auto font-bold text-red-400 hover:text-red-600 mb-4 relative"
            title="Cerrar sesión"
          >
            Cerrar Sesión
          </button>
        </div>
      </nav>

      {/* Modal de suscripción */}
      <SubscriptionModal
        isOpen={isSubModalOpen}
        onClose={() => setIsSubModalOpen(false)}
        title=""
      />
    </>
  );
}
