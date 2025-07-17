import Footer from "@/components/landing/Footer";
import NavbarLanding from "@/components/navbars/NavbarLanding";
import { LayoutProps } from '@/types/layout';

export default function LandingLayout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen overflow-x-hidden">
        <NavbarLanding/>
        {children}
        <Footer/>
    </div>
  );
}