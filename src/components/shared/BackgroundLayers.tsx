'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';

export default function BackgroundLayers() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="fixed inset-0 -z-10">
      <Image
        src="/backgroundApp.png"
        alt="Fondo de la app"
        fill
        priority
        style={{ objectFit: 'cover', opacity: 0.2 }} // Podés ajustar la opacidad a gusto
      />
    </div>
  );
}
