export default function CardBeneficios({ img, imgAlt, title, subtit }) {
    return (
      <div className="bg-white transition delay-150  uration-300 ease-in-out hover:-translate-y-1 hover:scale-110  rounded-2xl overflow-hidden shadow-lg w-full max-w-md">
        <div className="m-4" >
          <div className="mt-1 font-bold text-gray-700">
            <a  className="hover:underline">
              {title}
            </a>
          </div>
          <div className="mt-2 text-sm text-gray-600">{subtit}</div>
          
        </div>
        <img className="rounded-lg" src={img} alt={imgAlt} /> 
      </div>
      
    );
  }