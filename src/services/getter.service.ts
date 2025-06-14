import axios from 'axios';
import { PreferenceItem } from '@/types/auth/auth.types';

export async function getCookingLevels(): Promise<PreferenceItem[]> {
  try {
    const response = await axios.get('https://dev.cuoco.com.ar/api/cook-level');
    return response.data; // o response.data, si no hay .data interno
  } catch (error: any) {
    const message = error.response?.data?.message || 'Error al obtener niveles de cocina';
    throw new Error(message);
  }
}
export async function getAllergy(): Promise<PreferenceItem[]> {
  try {
    const response = await axios.get('https://dev.cuoco.com.ar/api/allergy');
    return response.data;
  } catch (error: any) {
    const message = error.response?.data?.message || 'Error al obtener alergias';
    throw new Error(message);
  }
}
export async function getPlan(): Promise<PreferenceItem[]> {
  try {
    const response = await axios.get('https://dev.cuoco.com.ar/api/plan');
    return response.data;
  } catch (error: any) {
    const message = error.response?.data?.message || 'Error al obtener planes';
    throw new Error(message);
  }
}
export async function getDiet(): Promise<PreferenceItem[]> {
  try {
    const response = await axios.get('https://dev.cuoco.com.ar/api/diet');
    return response.data;
  } catch (error: any) {
    const message = error.response?.data?.message || 'Error al obtener dieta';
    throw new Error(message);
  }
}
export async function getDietaryNeed(): Promise<PreferenceItem[]> {
  try {
    const response = await axios.get('https://dev.cuoco.com.ar/api/dietary-need');
    return response.data;
  } catch (error: any) {
    const message = error.response?.data?.message || 'Error al obtener necesidades de dieta';
    throw new Error(message);
  }
}
