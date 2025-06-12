import React from 'react';
import { DAYS, MEAL_TYPES } from '@/types';

export default function CalendarSkeleton() {
    return (
        <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="grid grid-cols-[120px_repeat(7,1fr)] gap-4">
                <div className="text-center font-semibold text-gray-700 pb-2" />

                {/* Headers de los días */}
                {DAYS.map((day) => (
                    <div
                        key={day}
                        className="animate-pulse h-6 bg-gray-200 rounded"
                    />
                ))}

                {/* Filas para cada tipo de comida */}
                {MEAL_TYPES.map((mealType) => (
                    <React.Fragment key={mealType}>
                        <div className="animate-pulse h-6 bg-gray-200 rounded w-20" />

                        {DAYS.map((day) => (
                            <div key={`${day}-${mealType}`} className="min-h-[120px]">
                                <div className="h-full border-2 border-dashed border-gray-200 rounded-lg p-3">
                                    <div className="animate-pulse space-y-2">
                                        <div className="h-16 bg-gray-200 rounded" />
                                        <div className="h-4 bg-gray-200 rounded w-3/4" />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </React.Fragment>
                ))}
            </div>
        </div>
    );
}