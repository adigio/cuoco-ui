import { ReactNode } from 'react';

interface ContainerShadowProps {
  children: ReactNode;
  customClass?: string;
}

export default function ContainerShadow({ children, customClass = '' }: ContainerShadowProps) {
  return (
    <div className={`bg-white rounded shadow p-4 ${customClass}`}>
      {children}
    </div>
  );
}
