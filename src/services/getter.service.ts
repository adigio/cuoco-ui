import { PreferenceItem } from '@/types/auth/auth.types';
import { apiClient } from '@/lib/axios.config';

export async function getCookingLevels(): Promise<PreferenceItem[]> {
  try {
    const response = await apiClient.get('cook-level');
    return response.data;
  } catch (error: any) {
    const message = error.response?.data?.message || 'Error al obtener niveles de cocina';
    throw new Error(message);
  }
}
export async function getAllergy(): Promise<PreferenceItem[]> {
  try {
    const response = await apiClient.get('allergy');
    return response.data;
  } catch (error: any) {
    const message = error.response?.data?.message || 'Error al obtener alergias';
    throw new Error(message);
  }
}
export async function getPlan(): Promise<PreferenceItem[]> {
  try {
    const response = await apiClient.get('plan');
    return response.data;
  } catch (error: any) {
    const message = error.response?.data?.message || 'Error al obtener planes';
    throw new Error(message);
  }
}
export async function getDiet(): Promise<PreferenceItem[]> {
  try {
    const response = await apiClient.get('diet');
    return response.data;
  } catch (error: any) {
    const message = error.response?.data?.message || 'Error al obtener dieta';
    throw new Error(message);
  }
}
export async function getDietaryNeed(): Promise<PreferenceItem[]> {
  try {
    const response = await apiClient.get('dietary-need');
    return response.data;
  } catch (error: any) {
    const message = error.response?.data?.message || 'Error al obtener necesidades de dieta';
    throw new Error(message);
  }
}
