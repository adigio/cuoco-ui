export default function CardBeneficios({ img, imgAlt, title, subtit }) {
    return (
      <div className="bg-white rounded-2xl overflow-hidden shadow-lg transform transition-transform hover:scale-105">
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