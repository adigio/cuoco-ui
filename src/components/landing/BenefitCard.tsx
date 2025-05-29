import { BenefitCardProps } from '@/types/components/landing.types';

export default function BenefitCard({ img, imgAlt, title, subtitle }: BenefitCardProps) {
  return (
    <div className="bg-white transition duration-300 ease-in-out hover:-translate-y-1 hover:scale-105 rounded-2xl overflow-hidden shadow-lg w-full max-w-sm min-w-[280px] min-h-[300px] flex flex-col mx-0 md:mx-5 my-6">
      <div className="p-6 flex-1 flex flex-col justify-start">
        <h3 className="font-semibold text-gray-800 text-xl mb-2">{title}</h3>
        <p className="text-sm text-gray-600">{subtitle}</p>
      </div>
      <img
        className="w-full h-44 object-cover rounded-b-2xl"
        src={img}
        alt={imgAlt}
      />
    </div>
  );
}
