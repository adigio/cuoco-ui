 
import NavbarLanding from "@/components/navbars/NavbarLanding";
import Footer from "@/components/Footer";
import AboutUs from "@/components/AboutUs";
import Benefits from "@/components/Benefits";
import Header from "@/components/Header";
export default function Home() {
  return (
    <div className="min-h-screen overflow-x-hidden"> {/* Esto asegura que el contenedor principal ocupe todo el alto de la pantalla */}
        <NavbarLanding />
        <main className="pt-16 md:pt-0 flex flex-col gap-16 items-center">
        <Header/>  
        <Benefits />  
        <AboutUs />
      </main>

      <Footer/>
    </div>
  );
}
