import RecipeCard from "@/components/shared/cards/RecipeCard";
import { faClock } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const recipes = [
  {
    id: 1,
    name: "Guiso de lentejas",
    image: "/plato.jpeg",
    time: "30’",
  },
  {
    id: 2,
    name: "Pechuga de pollo y ensalada",
    image: "/comida.png",
    time: "30’",
  },
  {
    id: 3,
    name: "Carne con papas y verduras",
    image: "/comida.png",
    time: "30’",
  },
];

export default function CardsInspiracion() {
  return (
    <div className="flex gap-4 justify-center px-4 pb-12 flex-wrap">
      {recipes.map((recipe) => (
        <RecipeCard customClass={"mx-auto"} key={recipe.id} recipe={recipe}>
          <div className='flex justify-between items-center px-2 text-red-400'>
            <div className='flex items-center gap-2.5 w-15'>
              <FontAwesomeIcon className='w-4 h-4' icon={faClock} />
              <p>{recipe.time}</p>
            </div>
          </div>
        </RecipeCard>
      ))}
    </div>
  );
}