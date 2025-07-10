export interface FoodPreferencesProps {
  level: string;
  setLevel: (val: string) => void;
  diet: string;
  setDiet: (val: string) => void;
  foodNeeds: string[];
  setFoodNeeds: (val: string[]) => void;
  allergies: string[];
  setAllergies: (val: string[]) => void;
  subStep: number;
} 