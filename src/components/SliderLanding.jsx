// components/TailwindSlider.js
'use client'; // si estás en app/ con Next 13+

import { useState, useEffect } from 'react';

const slides = [
  {
    image: '/heladera_confundida.jpg',
    title: '¿Qué cocino hoy?',
    subtitle: 'Recetas que usan lo que ya tenés',
  },
  {
    image: '/escaneo_heladera.webp',
    title: 'Usá lo que ya tenés',
    subtitle: 'Subí una foto, la IA hace el resto',
  },
  {
    image: '/plato.jpeg',
    title: 'Menos desperdicio',
    subtitle: 'Aprovechá al máximo tu despensa',
  },
  {
    image: '/comiendo.jpg',
    title: 'Cociná sin estrés',
    subtitle: 'Rápido, rico y sin vueltas',
  },
];

export default function TailwindSlider() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full h-[70vh] overflow-hidden">
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === current ? 'opacity-100 z-10' : 'opacity-0 z-0'
          }`}
        >
          <img
            src={slide.image}
            alt={slide.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center text-center text-white px-4">
            <h2 className="text-3xl md:text-5xl font-bold">{slide.title}</h2>
            <p className="text-lg md:text-2xl mt-2">{slide.subtitle}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
