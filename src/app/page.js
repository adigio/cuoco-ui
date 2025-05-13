 
import NavbarLanding from "@/components/navbars/NavbarLanding";
import Footer from "@/components/Footer";
import AboutUs from "@/components/AboutUs";
import Benefits from "@/components/Benefits";
import Header from "@/components/Header";
export default function Home() {
  return (
    <div className="min-h-screen overflow-x-hidden">
        <NavbarLanding />
        <main className="pt-16 md:pt-0 flex flex-col items-center">
        <Header/>  
        <Benefits />  
        <AboutUs />
      </main>

      <Footer/>
    </div>
  );
}
