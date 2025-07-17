import { BaseSkeleton } from './BaseSkeleton';
import BackgroundLayers from '@/components/shared/BackgroundLayers';
import ContainerShadow from '@/components/shared/containers/ContainerShadow';

const RecipeTagsSkeleton = () => (
    <div className="flex flex-wrap items-center gap-3 mb-8">
        {Array(3).fill(0).map((_, i) => (
            <BaseSkeleton key={i} className="h-10 w-24 rounded-full" />
        ))}
    </div>
);

const HeaderSkeleton = () => (
    <div className="flex justify-between items-center mb-6">
        <BaseSkeleton className="h-8 w-2/3" />
        <div className="flex items-center gap-4">
            <BaseSkeleton className="h-5 w-20" />
            <BaseSkeleton className="h-8 w-8 rounded-full" />
        </div>
    </div>
);

const StepsSkeleton = () => (
    <div>
        <BaseSkeleton className="h-6 w-32 mb-4" />
        <div className="space-y-4">
            {Array(4).fill(0).map((_, i) => (
                <div key={i} className="bg-white p-4 rounded shadow">
                    <BaseSkeleton className="h-4 w-full mb-2" />
                    <BaseSkeleton className="h-4 w-4/5" />
                </div>
            ))}
        </div>
    </div>
);

const SidebarSkeleton = () => (
    <div className="flex flex-col gap-6">
        {/* PDF Download Button */}
        <BaseSkeleton className="h-12 w-full rounded" />
        
        {/* Ingredients Section */}
        <div className="bg-white p-4 rounded shadow">
            <BaseSkeleton className="h-6 w-24 mb-3" />
            {Array(6).fill(0).map((_, i) => (
                <BaseSkeleton key={i} className="h-4 w-full mb-2 last:mb-0" />
            ))}
        </div>
        
        {/* Observation Section */}
        <div className="bg-white p-4 rounded shadow">
            <BaseSkeleton className="h-6 w-32 mb-3" />
            <BaseSkeleton className="h-4 w-full mb-2" />
            <BaseSkeleton className="h-4 w-3/4" />
        </div>
    </div>
);

const BackButtonSkeleton = () => (
    <div className="flex justify-center mt-8">
        <BaseSkeleton className="h-10 w-20 rounded" />
    </div>
);

export const MealPrepDetailSkeleton = () => {
    return (
        <>
            <BackgroundLayers />
            <div className="w-full border-b-4 border-purple-400 mb-6" />
            
            <main className="flex-1 relative">
                <ContainerShadow customClass="container shadow-xl">
                    <RecipeTagsSkeleton />
                    
                    <div className="flex flex-col lg:flex-row gap-8">
                        <section className="w-full lg:w-3/4">
                            <HeaderSkeleton />
                            <div className="border-t-2 border-gray-200 mb-10" />
                            <StepsSkeleton />
                        </section>
                        
                        <aside className="w-full lg:w-1/4">
                            <SidebarSkeleton />
                        </aside>
                    </div>
                    
                    <BackButtonSkeleton />
                </ContainerShadow>
            </main>
        </>
    );
}; 