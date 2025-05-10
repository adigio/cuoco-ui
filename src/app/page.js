 
import NavbarLanding from "@/components/navbars/NavbarLanding";
import SobrePlanicocina from "@/components/SobrePlanicocina";
import PrimerSeccion from "@/components/PrimerSeccion";
import Beneficios from "@/components/Beneficios";
import Footer from "@/components/Footer";
export default function Home() {
  return (
    <div className="min-h-screen"> {/* Esto asegura que el contenedor principal ocupe todo el alto de la pantalla */}
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <NavbarLanding />
        <PrimerSeccion /> 
        <Beneficios /> {/* Aquí va la sección de beneficios */}
        <SobrePlanicocina />
      </main>

       <Footer/>
    </div>
  );
}
