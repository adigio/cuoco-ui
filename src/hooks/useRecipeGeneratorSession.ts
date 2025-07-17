import { useIngredientsStore } from '@/store/useIngredientsStore';
import { usePathname } from 'next/navigation';
import { useEffect } from 'react';

export const useRecipeGeneratorSession = () => {
    const pathname = usePathname();
    const { clearIngredientsIfNeeded, startGeneratorSession } = useIngredientsStore();

    useEffect(() => {
        clearIngredientsIfNeeded(pathname || '');
        
        const generatorPaths = ['/recipe-generator', '/review', '/filters', '/results', '/recipe/'];
        const isInGeneratorFlow = generatorPaths.some(path => pathname?.includes(path));
        
        if (isInGeneratorFlow) {
            startGeneratorSession();
        }
    }, [pathname, clearIngredientsIfNeeded, startGeneratorSession]);
};