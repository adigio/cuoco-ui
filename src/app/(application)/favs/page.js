import HeroHome from "@/components/home/HeroHome";
import InspiracionTitulo from "@/components/home/InspiracionTitulo";
import CardsInspiracion from "@/components/home/CardsInspiracion";
import ChefLoader from "@/components/shared/ChefLoader";

export default function Favs() {
  return (
    <main className="pt-16 md:pt-0 flex flex-col items-center">
     
     <ChefLoader text="Favoritos en construccion..."/>
    </main>
  );
}