import { BaseSkeleton } from './BaseSkeleton';

export const RecipeCardSkeleton = () => {
    return (
        <div className="bg-white rounded-lg shadow-md p-4">
            {/* img*/}
            <BaseSkeleton className="w-full h-48 mb-4" />

            {/* titulo */}
            <BaseSkeleton className="w-3/4 h-6 mb-3" />

            {/* descripcion */}
            <div className="space-y-2">
                <BaseSkeleton className="w-full h-4" />
                <BaseSkeleton className="w-full h-4" />
            </div>

            {/* bottom */}
            <div className="flex gap-4 mt-4">
                <BaseSkeleton className="w-20 h-4" />
                <BaseSkeleton className="w-20 h-4" />
            </div>
        </div>
    );
};