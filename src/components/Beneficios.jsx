import CardBeneficios from "./CardBeneficios";
import TailwindSlider from "./SliderLanding";
export default function Beneficios() {
  return (
    <section  className="min-h-[70vh] w-full bg-purple-200 py-8 px-4 flex flex-col items-center">
      <div className="container mx-auto "> 
        <div className="">
           <TailwindSlider />
        </div>  
      </div>
    </section>
  );
}
