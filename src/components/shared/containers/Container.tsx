// components/Container.jsx
import React, { ReactNode } from 'react';

interface ContainerProps {
  children: ReactNode;
}

export default function Container({ children }: ContainerProps) {
  return (
    <div className="w-full min-h-screen max-w-[1200px] mx-auto px-6 relative" style={{ zIndex: "1" }}>
      {children}
    </div>
  );
}
