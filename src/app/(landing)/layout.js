import Footer from "@/components/landing/Footer";
import NavbarLanding from "@/components/navbars/NavbarLanding";

export default function RootLayout({ children }) {
  return (
    <div className="min-h-screen overflow-x-hidden">
        <NavbarLanding/>
        {children}
        <Footer/>
    </div>
  );
}