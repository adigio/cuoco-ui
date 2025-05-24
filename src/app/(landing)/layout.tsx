import Footer from "@/components/landing/Footer";
import NavbarLanding from "@/components/navbars/NavbarLanding";
import { Props } from "next/script";

export default function RootLayout({ children }: Props) {
  return (
    <div className="min-h-screen overflow-x-hidden">
        <NavbarLanding/>
        {children}
        <Footer/>
    </div>
  );
}