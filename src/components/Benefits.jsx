import TailwindSlider from "@/components/SliderLanding";

export default function Benefits() {
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
