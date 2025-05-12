 
import NavbarLanding from "@/components/navbars/NavbarLanding";
import SobrePlanicocina from "@/components/SobrePlanicocina";
import PrimerSeccion from "@/components/Header";
import Beneficios from "@/components/Beneficios";
import Footer from "@/components/Footer";
import CarrotLoader from "@/components/CarrotLoader";
export default function Home() {
  return (
    <div className="min-h-screen overflow-x-hidden"> {/* Esto asegura que el contenedor principal ocupe todo el alto de la pantalla */}
        <NavbarLanding />
        <main className="pt-16 flex flex-col gap-16 items-center">
        <PrimerSeccion />  
        <Beneficios />  
        <SobrePlanicocina />
      </main>

       <Footer/>
    </div>
  );
}
