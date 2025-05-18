import Image from "next/image";

const recetas = [
  {
    id: 1,
    titulo: "Guiso de lentejas",
    imagen: "/plato.jpeg",
    tiempo: "30’",
  },
  {
    id: 2,
    titulo: "Pechuga de pollo y ensalada",
    imagen: "/comida.png",
    tiempo: "30’",
  },
  {
    id: 3,
    titulo: "Carne con papas y verduras",
    imagen: "/comida.png",
    tiempo: "30’",
  },
];

export default function CardsInspiracion() {
  return (
    <div className="flex gap-4 justify-center px-4 pb-12 flex-wrap">
      {recetas.map((receta) => (
        <div key={receta.id} className="w-[240px] bg-white rounded-xl shadow-md overflow-hidden">
          <Image
            src={receta.imagen}
            alt={receta.titulo}
            width={240}
            height={160}
            className="object-cover"
          />
          <div className="p-4">
            <h3 className="font-medium text-base mb-2">{receta.titulo}</h3>
            <div className="text-gray-500 text-sm flex items-center gap-1">
              <span>🕒</span> <span>{receta.tiempo}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}