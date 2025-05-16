'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useIngredients } from '@/context/IngredientContext';
import { mockAnalyzeImages } from '@/services/visionService';
import NavbarLanding from '@/components/navbars/NavbarLanding';
import Footer from '@/components/landing/Footer';

export default function RecipeGeneratorPage() {
  const [images, setImages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [loading, setLoading] = useState(false);

  const { ingredients, setIngredients } = useIngredients();
  const router = useRouter();

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    setImages((prev) => [...prev, ...files]);
  };

  const handleInputChange = (e) => setInputValue(e.target.value);

  const handleIngredientKeyPress = (e) => {
    if (e.key === 'Enter' && inputValue.trim()) {
      const nuevo = { nombre: inputValue.trim(), fuente: 'manual', confirmado: true }; 
      setIngredients((prev) => [...prev, nuevo]);
      setInputValue('');
    }
  };

  const handleVoiceInput = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) return alert('Tu navegador no soporta reconocimiento de voz.');

    const recognition = new SpeechRecognition();
    recognition.lang = 'es-ES';
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.start();
    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      const nuevo = { nombre: transcript.trim(), fuente: 'voz', confirmado: false };
      setIngredients((prev) => [...prev, nuevo]);
    };
  };

  const handleContinue = async () => { 
    setLoading(true);
    const detectados = await mockAnalyzeImages(images);

    const nombresExistentes = new Set(ingredients.map(i => i.nombre.toLowerCase()));
    const nuevos = detectados.filter(i => !nombresExistentes.has(i.nombre.toLowerCase()));

    setIngredients((prev) => [...prev, ...nuevos]);
    setLoading(false);
    router.push('/review');
  };

  return (
    <div className="min-h-screen p-8 bg-[#fefefe]">
      <NavbarLanding />
<div className="container mx-auto px-4">
      <h1 className="text-3xl font-semibold mb-6 pt-10">Subí una foto de tu heladera o alacena</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="border-2 border-dashed border-red-300 p-6 rounded text-center">
          <input type="file" multiple accept="image/*" className="hidden" id="upload" onChange={handleImageUpload} />
          <label htmlFor="upload" className="cursor-pointer text-blue-600">
            Arrastrá o <span className="underline">haz clic</span>
          </label>
          <p className="text-sm mt-2 text-gray-500">JPG, PNG o GIF (máx. 800x400px)</p>
        </div>

        <div className="bg-white rounded shadow p-4 max-h-[300px] overflow-y-auto">
          <h2 className="font-semibold mb-2">Tus imágenes</h2>
          {images.length === 0 ? (
            <p className="text-gray-400">No hay imágenes cargadas.</p>
          ) : (
            images.map((img, idx) => (
              <img key={idx} src={URL.createObjectURL(img)} alt="" className="w-full h-[180px] object-cover rounded mb-2" />
            ))
          )}
        </div>
      </div>

      <div className="mt-8">
        <h2 className="text-lg font-medium">También podés escribir o decir qué tenés</h2>
        <div className="flex gap-4 mt-2 flex-wrap">
          <input
            type="text"
            placeholder="Ej: Leche, Huevos..."
            value={inputValue}
            onChange={handleInputChange}
            onKeyDown={handleIngredientKeyPress}
            className="border rounded px-4 py-2 w-full max-w-md"
          />
          <button onClick={handleVoiceInput} className="bg-gray-200 px-4 py-2 rounded-full text-xl">🎤</button>
        </div>

        <div className="flex flex-wrap gap-2 mt-4">
          {ingredients.map((item, idx) => (
            <span
              key={idx}
              className="bg-gray-200 text-sm px-3 py-1 rounded-full flex items-center gap-2"
            >
              {item.nombre}
              <button
                onClick={() => handleRemoveIngredient(idx)}
                className="text-gray-600 hover:text-red-500 font-bold"
                title="Eliminar"
              >
                ×
              </button>
            </span>
          ))}
        </div>

      </div>

      <div className="flex justify-end mt-10">
        <button
          onClick={handleContinue}
          disabled={loading}
          className="bg-[#f37b6a] text-white px-6 py-2 rounded"
        >
          {loading ? 'Analizando...' : 'Continuar'}
        </button>
      </div>
      </div>
      <Footer />
    </div>
  );
}
