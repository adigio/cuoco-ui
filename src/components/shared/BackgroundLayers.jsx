'use client';

import { useEffect, useState } from 'react';

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
        <img
          src="/tomate.png"
          alt="tomate decorativo"
          style={{ width: '160px', height: '160px', opacity: 0.5 }}
        />
      </div>

      {/* Palta - esquina derecha a media altura */}
      <div className="absolute top-1/3 right-10 animate-float">
        <img
          src="/palta.png"
          alt="palta decorativa"
          style={{ width: '180px', height: '180px', opacity: 0.5 }}
        />
      </div>

      {/* Tomate rotado - esquina superior derecha */}
      <div className="absolute top-20 right-20 animate-float-fast">
        <img
          src="/tomate.png"
          alt="tomate decorativo"
          style={{ width: '120px', height: '120px', opacity: 0.5, transform: 'rotate(45deg)' }}
        />
      </div>

      {/* Ají - esquina superior izquierda */}
      <div className="absolute top-40 left-20 animate-float-slow">
        <img
          src="/aji.png"
          alt="ají decorativo"
          style={{ width: '140px', height: '140px', opacity: 0.5 }}
        />
      </div>
    </div>
  );
}
