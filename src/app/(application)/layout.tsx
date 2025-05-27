'use client';

import Footer from "@/components/landing/Footer";
import NavbarHome from "@/components/navbars/NavbarHome";
import { useAuthStore } from "@/store/useAuthStore";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

interface Props {
  children: React.ReactNode;
}

export default function AppLayout({ children }: Props) {
  const { isAuthenticated } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/');
    }
  }, [isAuthenticated]);

  // Evitá mostrar la vista hasta que sepamos si está autenticado
  if (!isAuthenticated) return null;

  return (
    <div className="flex flex-col min-h-screen bg-[#fefefe]">
      <NavbarHome />
      {children}
      <Footer />
    </div>
  );
}
