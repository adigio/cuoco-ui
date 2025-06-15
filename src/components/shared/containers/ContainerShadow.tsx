import React from 'react';
import { ContainerShadowProps } from '@/types/components/layout.types';

export default function ContainerShadow({ children, customClass = '' }: ContainerShadowProps) {
  return (
    <div className={`bg-white rounded shadow p-4 ${customClass}`}>
      {children}
    </div>
  );
}
