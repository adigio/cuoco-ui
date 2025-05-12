export default function BenefitCards({ img, imgAlt, title, subtitle, position = '' }) {
    return (
      <div className={`bg-white transition delay-150 text-center duration-300 ease-in-out hover:-translate-y-1 hover:scale-110 rounded-2xl overflow-hidden shadow-lg w-full max-w-xs min-w-[270px] min-h-[240px] flex flex-col ${position}`}> 
        <div className="p-4 flex-1 flex flex-col justify-start">
          <div className="mt-1 font-bold text-gray-700 text-lg">
            <span className="cursor-pointer">{title}</span>
          </div>
          <div className="mt-2 text-sm text-gray-600">{subtitle}</div>
        </div>
        <img
          className="w-full h-40 object-cover rounded-b-2xl"
          src={img}
          alt={imgAlt}
        />
      </div>
    );
  }