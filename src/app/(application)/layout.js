import Footer from "@/components/landing/Footer";
import NavbarHome from "@/components/navbars/NavbarHome";

export default function AppLayout({ children }) {
  return (
    <div className="flex flex-col min-h-screen bg-[#fefefe]">
      <NavbarHome/>
      {children}
      <Footer />
    </div>
  );
}