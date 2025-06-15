'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';

export default function BackgroundLayers() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Solo renderizamos en el cliente para evitar errores de SSR
  if (!mounted) return null;

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none" style={{ zIndex: "-10" }}>
      {/* Tomate - esquina inferior izquierda */}
      <div className="absolute bottom-20 left-10 animate-float-slow">
        <div className="relative" style={{ width: '160px', height: '160px' }}>
          <Image
            src="/tomate.png"
            alt="tomate decorativo"
            fill
            style={{ opacity: 0.65 }}
          />
        </div>
      </div>

      {/* Palta - esquina derecha a media altura */}
      <div className="absolute top-1/3 right-10 animate-float">
        <div className="relative" style={{ width: '180px', height: '180px' }}>
          <Image
            src="/palta.png"
            alt="palta decorativa"
            fill
            style={{ opacity: 0.65 }}
          />
        </div>
      </div>

      {/* Tomate rotado - esquina superior derecha */}
      <div className="absolute top-20 right-20 animate-float-fast">
        <div className="relative" style={{ width: '120px', height: '120px' }}>
          <Image
            src="/tomate.png"
            alt="tomate decorativo"
            fill
            style={{ opacity: 0.65, transform: 'rotate(45deg)' }}
          />
        </div>
      </div>

      {/* Ají - esquina superior izquierda */}
      <div className="absolute top-40 left-20 animate-float-slow">
        <div className="relative" style={{ width: '140px', height: '140px' }}>
          <Image
            src="/aji.png"
            alt="ají decorativo"
            fill
            style={{ opacity: 0.65 }}
          />
        </div>
      </div>
    </div>
  );
}
