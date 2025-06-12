import { BaseSkeleton } from './BaseSkeleton';
import BackgroundLayers from '@/components/shared/BackgroundLayers';
import ContainerShadow from '@/components/shared/containers/ContainerShadow';

const HeaderSkeleton = () => (
    <div className="flex justify-between items-start gap-2">
        <div className="w-full flex flex-col gap-2">
            <BaseSkeleton className="h-8 w-3/4 mb-2" />
            <BaseSkeleton className="h-4 w-1/2 mb-4" />
        </div>
        <div className="flex items-center gap-4 mb-6">
            <BaseSkeleton className="h-5 w-24" />
            <BaseSkeleton className="h-5 w-24" />
        </div>
    </div>
);

const IngredientSection = ({ title, items }: { title: string, items: number }) => (
    <div>
        <BaseSkeleton className="h-6 w-32 mb-2" />
        <div className="bg-white p-4 rounded shadow">
            {Array(items).fill(0).map((_, i) => (
                <BaseSkeleton key={i} className="h-4 w-full mb-2 last:mb-0" />
            ))}
        </div>
    </div>
);

const InstructionsSkeleton = () => (
    <div>
        <BaseSkeleton className="h-6 w-32 mb-2" />
        <div className="bg-white p-4 rounded shadow space-y-2">
            {Array(4).fill(0).map((_, i) => (
                <div key={i} className="flex gap-2 items-start">
                    <BaseSkeleton className="h-4 w-4" />
                    <BaseSkeleton className="h-4 w-full" />
                </div>
            ))}
        </div>
    </div>
);

export const RecipeDetailSkeleton = () => {
    return (
        <>
            <BackgroundLayers />
            <div className="w-full border-b-4 border-purple-400 mb-6" />
            <main className="flex-1 relative">
                <ContainerShadow customClass="container">
                    <HeaderSkeleton />

                    <div className="grid md:grid-cols-2 gap-6 mb-8">
                        <IngredientSection title="Ingredientes" items={5} />
                        <IngredientSection title="Necesitás comprar" items={3} />
                    </div>

                    <InstructionsSkeleton />

                </ContainerShadow>
            </main>
        </>
    );
};