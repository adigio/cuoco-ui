"use client";

import { Props } from "next/script";
import { useEffect, useState } from "react";
import ChefLoader from "@/components/shared/loaders/ChefLoader";
import { useAuthInitialization } from "@/hooks/useAuthInitialization";

export default function ClientProvider({ children }: Props) {
  const [mswReady, setMswReady] = useState(process.env.NODE_ENV !== 'development' && process.env.NEXT_PUBLIC_ENABLE_MSW !== 'true');
  
  // Inicializar autenticación al cargar la aplicación
  useAuthInitialization();
  
  // Debug del estado de autenticación
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const { useAuthStore } = require('@/store/useAuthStore');
      const authStore = useAuthStore.getState();
      console.log('🔍 Estado inicial de autenticación:', {
        isAuthenticated: authStore.isAuthenticated,
        hasUser: !!authStore.user,
        hasToken: !!authStore.token,
      });
    }
  }, []);

  useEffect(() => {
    // 🚨 MSW COMPLETAMENTE DESHABILITADO para evitar interferencia con API real
    setMswReady(true); // Saltar MSW completamente
  }, []);

  // ⛔️ No renderizar children hasta que MSW esté iniciado
  if (!mswReady) {
   return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <ChefLoader />
        <p className="mt-4 text-gray-600">Cargando entorno simulado...</p>
      </div>
    );
  }

  return <>{children}</>;
}
