import AboutUs from "@/components/landing/AboutUs";
import Benefits from "@/components/landing/Benefits";
import Header from "@/components/landing/Header";

const benefitsItems = [
  {
    img: "/heladera_confundida.jpg",
    imgAlt: "Find Freezer",
    title: "¿Qué cocino hoy?",
    subtitle: "Recetas que usan lo que ya tenés"
  },
  {
    img: "/escaneo_heladera.webp",
    imgAlt: "Scan",
    title: "Usá lo que ya tenés",
    subtitle: "Subí una foto, la IA hace el resto"
  },
  {
    img: "/plato.jpeg",
    imgAlt: "dish",
    title: "Menos desperdicio",
    subtitle: "Aprovechá al máximo tu despensa"
  },
  {
    img: "/comiendo.jpg",
    imgAlt: "dish",
    title: "Cociná sin estrés",
    subtitle: "Rápido, rico y sin vueltas"
  }
];
  
export default function LandingPage() {
  return (
      <main className="pt-16 md:pt-0 flex flex-col items-center">
      <Header/>  
      <Benefits items={benefitsItems}/>    
      <AboutUs/>
    </main>
  );
}
