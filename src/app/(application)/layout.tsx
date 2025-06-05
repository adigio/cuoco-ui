'use client';

import Footer from "@/components/landing/Footer";
import NavbarHome from "@/components/navbars/NavbarHome";
import { useAuthStore } from "@/store/useAuthStore";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useHydrated } from "@/utils/useHydrated";

interface Props {
  children: React.ReactNode;
}

export default function AppLayout({ children }: Props) {
  const { isAuthenticated } = useAuthStore();
  const hydrated = useHydrated(); //
  const router = useRouter();

  useEffect(() => {
    if (hydrated && !isAuthenticated) {
      router.push('/');
    }
  }, [hydrated, isAuthenticated, router]);

  // Esperamos a que Zustand hidrate antes de renderizar o redirigir
  if (!hydrated) return null;

  if (!isAuthenticated) return null;

  return (
    <div className="flex flex-col min-h-screen bg-[#fefefe]">
      <NavbarHome />
      {children}
      <Footer />
    </div>
  );
}
