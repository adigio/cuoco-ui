import AboutUs from "@/components/landing/AboutUs";
import Benefits from "@/components/landing/Benefits";
import Header from "@/components/landing/Header";
import WhyCuoco from "@/components/landing/WhyCouco";
const benefitsItems = [
  
  {
    img: "/escaneo_heladera.webp",
    imgAlt: "Scan",
    title: "Mostrá lo que tenés en tu heladera o alacena.",
    subtitle: "Subí una foto, la IA hace el resto"
  },
  {
    img: "/plato.jpeg",
    imgAlt: "dish",
    title: "Te sugerimos recetas con lo que encontrás.",
    subtitle: "Aprovechá al máximo tu despensa"
  },
  {
    img: "/comiendo.jpg",
    imgAlt: "dish",
    title: "Listo. Rápido, fácil y sin desperdicio.",
    subtitle: "Rápido, rico y sin vueltas"
  }
];
  
export default function LandingPage() {
  return (
      <main className="pt-16 md:pt-0 flex flex-col items-center">
      <Header/>  
      <Benefits items={benefitsItems}/>    
      <WhyCuoco/>    
      <AboutUs/>
    </main>
  );
}
