import Image from "next/image";
import { StepSectionProps } from "@/types/components/landing.types";

export default function StepSection({
  step,
  title,
  description,
  image,
  imageAlt,
  buttonText,
  reverse = false,
  id,
  showConnector = true
}: StepSectionProps) {
  return (
    <>
      <section id={id} className="relative w-full bg-transparent">
        <div className="max-w-7xl mx-auto px-4 md:px-8 items-center">
          <div
            className={`relative z-10 mt-20 flex flex-col md:flex-row items-center gap-16 ${
              reverse ? "md:flex-row-reverse" : ""
            }`}
          >
            {/* Imagen */}
            <div className="w-full md:w-1/2 flex justify-center">
              <div className="w-[420px] h-[420px]">
                <Image
                  src={image}
                  alt={imageAlt}
                  width={420}
                  height={420}
                  className="w-full h-full object-cover rounded-xl shadow-md z-10"
                />
              </div>
            </div>

            {/* Texto */}
            <div className="w-full md:w-1/2 text-center md:text-left">
              <div className="flex items-center justify-center md:justify-start mb-2">
                <div className="w-14 h-14 rounded-full bg-[#f37b6a] text-white flex items-center justify-center text-5xl font-bold">
                  {step}
                </div>
              </div>
              <h2 className="text-3xl font-semibold mb-4">{title}</h2>
              <p className="text-gray-700 text-base mb-6 whitespace-pre-line">
                {description}
              </p>
              {buttonText && (
                <button className="background-color-nav-scrolled hover:bg-red-400 transition text-white px-6 py-2 rounded">
                  {buttonText}
                </button>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* SVG con flecha que baja hacia el próximo paso */}
      {showConnector && step !== 4 && (
        <div className="hidden md:flex justify-center relative z-0 h-[100px] -mt-6">
          <svg
            width="800"
            height="100"
            viewBox="0 0 800 100"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={`${reverse ? "rotate-180" : ""}`}
          >
            <defs>
              <marker
                id="arrowhead"
                markerWidth="10"
                markerHeight="10"
                refX="5"
                refY="5"
                orient="auto"
              >
                <polygon points="0 0, 10 5, 0 10" fill="#f37b6a" />
              </marker>
            </defs>
            <path
              d="M0 50 C200 100, 600 0, 800 50"
              stroke="#d1d5db"
              strokeWidth="3"
              strokeDasharray="10,6"
              fill="none"
              markerEnd="url(#arrowhead)"
            />
          </svg>
        </div>
      )}
    </>
  );
}
