import { PreferenceItem } from '@/types/auth/auth.types';
import { apiClient } from '@/lib/axios.config';

export async function getCookingLevels(): Promise<PreferenceItem[]> {
  try {
    const response = await apiClient.get('cook-levels');
    console.log(response);
    return response.data;
  } catch (error: any) {
    const message = error.response?.data?.message || 'Error al obtener niveles de cocina';
    throw new Error(message);
  }
}
export async function getAllergy(): Promise<PreferenceItem[]> {
  try {
    const response = await apiClient.get('allergies');
    return response.data;
  } catch (error: any) {
    const message = error.response?.data?.message || 'Error al obtener alergias';
    throw new Error(message);
  }
}
export async function getPlan(): Promise<PreferenceItem[]> {
  try {
    const response = await apiClient.get('plans');
    return response.data;
  } catch (error: any) {
    const message = error.response?.data?.message || 'Error al obtener planes';
    throw new Error(message);
  }
}
export async function getDiet(): Promise<PreferenceItem[]> {
  try {
    const response = await apiClient.get('diets');
    return response.data;
  } catch (error: any) {
    const message = error.response?.data?.message || 'Error al obtener dieta';
    throw new Error(message);
  }
}
export async function getDietaryNeed(): Promise<PreferenceItem[]> {
  try {
    const response = await apiClient.get('dietary-needs');
    return response.data;
  } catch (error: any) {
    const message = error.response?.data?.message || 'Error al obtener necesidades de dieta';
    throw new Error(message);
  }
}
export async function getUnitTypes(): Promise<PreferenceItem[]> {
  try {
    const response = await apiClient.get('units');
    return response.data;
  } catch (error: any) {
    const message = error.response?.data?.message || 'Error al obtener necesidades de dieta';
    throw new Error(message);
  }
}
export async function getPreparationTimes(): Promise<PreferenceItem[]> {
  try {
    const response = await apiClient.get('preparation-times');
    return response.data;
  } catch (error: any) {
    const message = error.response?.data?.message || 'Error al obtener necesidades de dieta';
    throw new Error(message);
  }
}
export async function getMealTypes(): Promise<PreferenceItem[]> {
  try {
    const response = await apiClient.get('meal-types');
    return response.data;
  } catch (error: any) {
    const message = error.response?.data?.message || 'Error al obtener necesidades de dieta';
    throw new Error(message);
  }
}
