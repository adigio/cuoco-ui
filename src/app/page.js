 
import NavbarLanding from "@/components/navbars/NavbarLanding";
import Footer from "@/components/landing/Footer";
import AboutUs from "@/components/landing/AboutUs";
import Benefits from "@/components/landing/Benefits";
import Header from "@/components/landing/Header";
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
