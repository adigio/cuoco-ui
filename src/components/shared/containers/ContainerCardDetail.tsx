import React from 'react';
import { ContainerCardDetailProps } from '@/types/components/layout.types';

export default function ContainerCardDetail({ children, customClass = '', title = ''}: ContainerCardDetailProps) {
    return (
        <div className={`bg-white rounded shadow-xl p-4 ${customClass}`}>
            {title && (
                <div className="flex items-center justify-center border-b border-gray-200 mb-4 text-gray-700">
                    <h2 className="text-xl font-bold pb-2">{title}</h2>
                </div>
            )}
            {children}
        </div>
    );
}
