import React from 'react';
import { ContainerCardDetailProps } from '@/types/components/layout.types';

//TODO integrarlo en mealprep
export default function ContainerCardDetail({ children, customClass = '', title = ''}: ContainerCardDetailProps) {
    return (
        <div className={`bg-white rounded shadow p-4 ${customClass}`}>
            {title && (
                <div className="flex items-center justify-center border-b border-gray-200 mb-4">
                    <h2 className="text-1xl font-bold pb-2">{title}</h2>
                </div>
            )}
            {children}
        </div>
    );
}
