import { useIngredientsStore } from '@/store/useIngredientsStore';
import { usePathname } from 'next/navigation';
import { useEffect } from 'react';

export const useRecipeGeneratorSession = () => {
    const pathname = usePathname();
    const { clearIngredientsIfNeeded, startGeneratorSession } = useIngredientsStore();

    useEffect(() => {
        // Verificar si necesitamos limpiar ingredientes basado en la ruta actual
        clearIngredientsIfNeeded(pathname || '');
        
        // Si estamos en el flujo del generador, activar sesión
        const generatorPaths = ['/recipe-generator', '/review', '/filters', '/results'];
        const isInGeneratorFlow = generatorPaths.some(path => pathname?.includes(path));
        
        if (isInGeneratorFlow) {
            startGeneratorSession();
        }
    }, [pathname, clearIngredientsIfNeeded, startGeneratorSession]);
};