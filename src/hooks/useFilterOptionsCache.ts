import { useEffect, useMemo, useCallback } from "react";
import { usePreferencesStore } from "@/store/usePreferencesStore";
import { useAuthStore } from "@/store/useAuthStore";
import {
  getCookingLevels,
  getAllergy,
  getDiet,
  getDietaryNeed,
  getUnitTypes,
  getPreparationTimes,
  getMealTypes,
} from "@/services/getter.service";

const CACHE_TTL = 24 * 60 * 60 * 1000;

export const useFilterOptionsCache = () => {
  const {
    isFetching,
    isLoaded,
    loadedWithAuth,
    lastFetchTimestamp,
    cookingLevelOptions,
    allergyOptions,
    dietOptions,
    dietaryNeedOptions,
    unitOptions,
    preparationTimeOptions,
    mealTypeOptions,
    setIsFetching,
    setIsLoaded,
    setLastFetchTimestamp,
    setLoadedWithAuth,
    setCookingLevelOptions,
    setAllergyOptions,
    setDietOptions,
    setDietaryNeedOptions,
    setUnitOptions,
    setPreparationTimeOptions,
    setMealTypeOptions,
  } = usePreferencesStore();

  const { isAuthenticated } = useAuthStore();

  // useEffect 1 - Reset si entra autenticado
  useEffect(() => {
    if (isAuthenticated && isLoaded && !loadedWithAuth) {
      setIsLoaded(false);
      setLastFetchTimestamp(null);
      setLoadedWithAuth(false);
    }
  }, [
    isAuthenticated,
    isLoaded,
    loadedWithAuth,
    setIsLoaded,
    setLastFetchTimestamp,
    setLoadedWithAuth,
  ]);

  const shouldFetchData = useCallback(() => {
    if (isFetching) return false;

    if (
      !isLoaded ||
      cookingLevelOptions.length === 0 ||
      allergyOptions.length === 0 ||
      dietOptions.length === 0
    ) return true;

    if (loadedWithAuth !== isAuthenticated) return true;

    if (
      isAuthenticated &&
      (
        unitOptions.length === 0 ||
        preparationTimeOptions.length === 0 ||
        mealTypeOptions.length === 0
      )
    ) return true;

    if (lastFetchTimestamp) {
      const timeElapsed = Date.now() - lastFetchTimestamp;
      return timeElapsed > CACHE_TTL;
    }

    return true;
  }, [
    isAuthenticated,
    isFetching,
    isLoaded,
    cookingLevelOptions.length,
    allergyOptions.length,
    dietOptions.length,
    loadedWithAuth,
    unitOptions.length,
    preparationTimeOptions.length,
    mealTypeOptions.length,
    lastFetchTimestamp,
  ]);

  // useEffect 2 - Fetch
useEffect(() => {
  if (!shouldFetchData()) return;

  const fetchAllFilterOptions = async () => {
    try {
      setIsFetching(true);

      const cookingLevels = await getCookingLevels();
      const allergies = await getAllergy();
      const diets = await getDiet();
      const dietaryNeeds = await getDietaryNeed();

      let units: any[] = [];
      let preparationTimes: any[] = [];
      let mealTypes: any[] = [];

      if (isAuthenticated) {
        units = await getUnitTypes();
        preparationTimes = await getPreparationTimes();
        mealTypes = await getMealTypes();
      }

      setCookingLevelOptions(cookingLevels || []);
      setAllergyOptions(allergies || []);
      setDietOptions(diets || []);
      setDietaryNeedOptions(dietaryNeeds || []);
      setUnitOptions(units || []);
      setPreparationTimeOptions(preparationTimes || []);
      setMealTypeOptions(mealTypes || []);
      setIsLoaded(true);
      setLastFetchTimestamp(Date.now());
      setLoadedWithAuth(isAuthenticated);
    } catch (error) {
    } finally {
      setIsFetching(false);
    }
  };

  fetchAllFilterOptions();
}, [
  isAuthenticated,
  shouldFetchData,
  setAllergyOptions,
  setCookingLevelOptions,
  setDietOptions,
  setDietaryNeedOptions,
  setIsFetching,
  setIsLoaded,
  setLastFetchTimestamp,
  setLoadedWithAuth,
  setMealTypeOptions,
  setPreparationTimeOptions,
  setUnitOptions
]);


  const mapToSelectOptions = (items: any[]) =>
    Array.from(new Map(items.map((i) => [i.description, i])).values()).map(
      (item) => ({
        key: item.id,
        value: item.id,
        label: item.description,
      })
    );

  const mapUnitOptions = (items: any[]) =>
    Array.from(
      new Map(
        items.map((i) => [i.symbol || i.label || i.description, i])
      ).values()
    ).map((item) => ({
      key: item.key || item.id,
      value: item.value || item.id,
      label: item.label || item.symbol || item.description,
      symbol: item.symbol,
    }));

  const difficultyOptions = useMemo(
    () => mapToSelectOptions(cookingLevelOptions),
    [cookingLevelOptions]
  );

  const allergyOptionsMapped = useMemo(
    () => mapToSelectOptions(allergyOptions),
    [allergyOptions]
  );

  const dietOptionsMapped = useMemo(
    () => mapToSelectOptions(dietOptions),
    [dietOptions]
  );

  const needOptions = useMemo(
    () => mapToSelectOptions(dietaryNeedOptions),
    [dietaryNeedOptions]
  );

  const timeOptions = useMemo(
    () => mapToSelectOptions(preparationTimeOptions),
    [preparationTimeOptions]
  );

  const mealOptions = useMemo(
    () => mapToSelectOptions(mealTypeOptions),
    [mealTypeOptions]
  );

  const unitOptionsMapped = useMemo(
    () => mapUnitOptions(unitOptions),
    [unitOptions]
  );

  const returnData = useMemo(
    () => ({
      isLoaded,
      difficultyOptions,
      allergyOptions: allergyOptionsMapped,
      dietOptions: dietOptionsMapped,
      needOptions,
      timeOptions,
      mealOptions,
      unitOptions: unitOptionsMapped,
      cookingLevelOptions,
      originalAllergyOptions: allergyOptions,
      originalDietOptions: dietOptions,
      originalDietaryNeedOptions: dietaryNeedOptions,
      originalUnitOptions: unitOptions,
      originalPreparationTimeOptions: preparationTimeOptions,
      originalMealTypeOptions: mealTypeOptions,
    }),
    [
      isLoaded,
      difficultyOptions,
      allergyOptionsMapped,
      dietOptionsMapped,
      needOptions,
      timeOptions,
      mealOptions,
      unitOptionsMapped,
      cookingLevelOptions,
      allergyOptions,
      dietOptions,
      dietaryNeedOptions,
      unitOptions,
      preparationTimeOptions,
      mealTypeOptions,
    ]
  );

  return returnData;
};
