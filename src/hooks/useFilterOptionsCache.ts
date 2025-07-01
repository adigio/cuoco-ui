import { useEffect, useMemo } from 'react';
import { usePreferencesStore } from '@/store/usePreferencesStore';
import { useAuthStore } from '@/store/useAuthStore';
import {
  getCookingLevels,
  getAllergy,
  getDiet,
  getDietaryNeed,
  getUnitTypes,
  getPreparationTimes,
  getMealTypes,
} from '@/services/getter.service';

const CACHE_TTL = 24 * 60 * 60 * 1000;

export const useFilterOptionsCache = () => {
  const store = usePreferencesStore();
  const { isAuthenticated } = useAuthStore();

  useEffect(() => {
    if (isAuthenticated && store.isLoaded && !store.loadedWithAuth) {
      store.setIsLoaded(false);
      store.setLastFetchTimestamp(null);
      store.setLoadedWithAuth(false);
    }
  }, [isAuthenticated]);

  const shouldFetchData = () => {
    if (store.isFetching) {
      return false;
    }
    
    if (!store.isLoaded || 
        store.cookingLevelOptions.length === 0 ||
        store.allergyOptions.length === 0 ||
        store.dietOptions.length === 0) {
      return true;
    }

    if (store.loadedWithAuth !== isAuthenticated) {
      return true;
    }

    if (isAuthenticated && (
        store.unitOptions.length === 0 ||
        store.preparationTimeOptions.length === 0 ||
        store.mealTypeOptions.length === 0
    )) {
      return true;
    }
    
    if (store.lastFetchTimestamp) {
      const timeElapsed = Date.now() - store.lastFetchTimestamp;
      return timeElapsed > CACHE_TTL;
    }
    
    return true;
  };

  useEffect(() => {
    if (!shouldFetchData()) {
      return;
    }
    
    const fetchAllFilterOptions = async () => {
      try {
        store.setIsFetching(true);
        
        const cookingLevels = await getCookingLevels();
        const allergies = await getAllergy();
        const diets = await getDiet();
        const dietaryNeeds = await getDietaryNeed();
        
        let units: any[] = [];
        if (isAuthenticated) {
          units = await getUnitTypes();
        }
        
        let preparationTimes: any[] = [];
        if (isAuthenticated) {
          preparationTimes = await getPreparationTimes();
        }
        
        let mealTypes: any[] = [];
        if (isAuthenticated) {
          mealTypes = await getMealTypes();
        }

        store.setCookingLevelOptions(cookingLevels || []);
        store.setAllergyOptions(allergies || []);
        store.setDietOptions(diets || []);
        store.setDietaryNeedOptions(dietaryNeeds || []);
        store.setUnitOptions(units || []);
        store.setPreparationTimeOptions(preparationTimes || []);
        store.setMealTypeOptions(mealTypes || []);
        store.setIsLoaded(true);
        store.setLastFetchTimestamp(Date.now());
        store.setLoadedWithAuth(isAuthenticated);
        
      } catch (error) {
        console.error('Error loading filter options:', error);
      } finally {
        store.setIsFetching(false);
      }
    };

    fetchAllFilterOptions();
  }, [isAuthenticated]);

  const mapToSelectOptions = (items: any[]) =>
    Array.from(new Map(items.map((i) => [i.description, i])).values()).map(
      (item) => ({
        key: item.id,
        value: item.id,
        label: item.description,
      })
    );

  const mapUnitOptions = (items: any[]) =>
    Array.from(new Map(items.map((i) => [i.symbol || i.label || i.description, i])).values()).map(
      (item) => ({
        key: item.key || item.id,
        value: item.value || item.id,
        label: item.label || item.symbol || item.description,
        symbol: item.symbol,
      })
    );

  const difficultyOptions = useMemo(() => 
    mapToSelectOptions(store.cookingLevelOptions), 
    [store.cookingLevelOptions]
  );
  
  const allergyOptions = useMemo(() => 
    mapToSelectOptions(store.allergyOptions), 
    [store.allergyOptions]
  );
  
  const dietOptions = useMemo(() => 
    mapToSelectOptions(store.dietOptions), 
    [store.dietOptions]
  );
  
  const needOptions = useMemo(() => 
    mapToSelectOptions(store.dietaryNeedOptions), 
    [store.dietaryNeedOptions]
  );
  
  const timeOptions = useMemo(() => 
    mapToSelectOptions(store.preparationTimeOptions), 
    [store.preparationTimeOptions]
  );
  
  const mealOptions = useMemo(() => 
    mapToSelectOptions(store.mealTypeOptions), 
    [store.mealTypeOptions]
  );
  
  const unitOptions = useMemo(() => 
    mapUnitOptions(store.unitOptions), 
    [store.unitOptions]
  );

  const returnData = useMemo(() => ({
    isLoaded: store.isLoaded,
    difficultyOptions,
    allergyOptions,
    dietOptions,
    needOptions,
    timeOptions,
    mealOptions,
    unitOptions,
    cookingLevelOptions: store.cookingLevelOptions,
    originalAllergyOptions: store.allergyOptions,
    originalDietOptions: store.dietOptions,
    originalDietaryNeedOptions: store.dietaryNeedOptions,
    originalUnitOptions: store.unitOptions,
    originalPreparationTimeOptions: store.preparationTimeOptions,
    originalMealTypeOptions: store.mealTypeOptions,
  }), [
    store.isLoaded,
    difficultyOptions,
    allergyOptions,
    dietOptions,
    needOptions,
    timeOptions,
    mealOptions,
    unitOptions,
    store.cookingLevelOptions,
    store.allergyOptions,
    store.dietOptions,
    store.dietaryNeedOptions,
    store.unitOptions,
    store.preparationTimeOptions,
    store.mealTypeOptions,
  ]);

  return returnData;
}; 