import Link from "next/link"

export default function RecipeCard({ recipe, children }) {
    return (
        <div className={`bg-white pb-4 transition delay-150 text-center duration-300 ease-in-out hover:-translate-y-1 hover:scale-110 rounded-2xl overflow-hidden shadow-lg w-full max-w-xs min-w-[270px] min-h-[240px] flex justify-between flex-col mx-0 md:mx-5 my-4`}>
            <Link href={`/recipe/${recipe.id}`} className="w-full">
                <img
                    className="w-full rounded-t-2xl h-35 object-cover"
                    src={recipe.image}
                    alt={recipe.name}
                />
                <div className="p-6 flex-1 flex flex-col justify-start">
                    <div className="mt-1 font-bold text-red-400 text-lg">
                        <span className="cursor-pointer">{recipe.name}</span>
                    </div>
                    <div className="mt-1 text-md text-red-400">{recipe.subtitle}</div>
                </div>
            </Link>
            {children}
        </div>
    );
}
