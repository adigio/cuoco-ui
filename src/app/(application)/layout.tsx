import Footer from "@/components/landing/Footer";
import NavbarHome from "@/components/navbars/NavbarHome";
import { Props } from "next/script";

export default function AppLayout({ children }: Props) {
  return (
    <div className="flex flex-col min-h-screen bg-[#fefefe]">
      <NavbarHome/>
      {children}
      <Footer />
    </div>
  );
}