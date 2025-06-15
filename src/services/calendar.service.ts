import axios from 'axios';
import { WeeklySchedule, CalendarRecipe } from '@/types';

export const calendarService = {
    getWeeklySchedule: async (): Promise<WeeklySchedule> => {
        const response = await axios.get('/api/calendar/weekly');
        return response.data;
    },

    getFavoritesByCategory: async (): Promise<Record<string, CalendarRecipe[]>> => {
        const response = await axios.get('/api/calendar/favorites/categorized');
        return response.data;
    },


    updateWeeklySchedule: async (schedule: WeeklySchedule): Promise<WeeklySchedule> => {
        const response = await axios.put('/api/calendar/update', { schedule });
        return response.data;
    }
};