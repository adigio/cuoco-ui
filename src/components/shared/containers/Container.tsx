// components/Container.jsx
import React from 'react';
import { ContainerProps } from '@/types/components/layout.types';

export default function Container({ children }: ContainerProps) {
  return (
    <div className="w-full min-h-screen max-w-[1200px] mx-auto px-6 relative" style={{ zIndex: "1" }}>
      {children}
    </div>
  );
}
