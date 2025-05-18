import Footer from "@/components/landing/Footer"; 
import NavbarHome from "@/components/navbars/NavbarHome";
import HeroHome from "@/components/home/HeroHome"; 
import InspiracionTitulo from "@/components/home/InspiracionTitulo"; 
import CardsInspiracion from "@/components/home/CardsInspiracion"; 

export default function HomeIniciado() {
  return (
    <div className="min-h-screen overflow-x-hidden">
        <NavbarHome />
        <main className="pt-16 md:pt-0 flex flex-col items-center">
        <HeroHome />
        <InspiracionTitulo />
        <CardsInspiracion />
      </main>
    
        <Footer />
        
    </div>
  );
}