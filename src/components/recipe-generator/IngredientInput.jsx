'use client';

import React, { useState } from 'react';

export default function RecipeIngredientInput({ setIngredients }) {
  const [inputValue, setInputValue] = useState('');

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

  return (
    <div>
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
        <button 
          onClick={handleVoiceInput} 
          className="bg-gray-200 px-4 py-2 rounded-full text-xl"
          title="Reconocimiento de voz"
        >
          🎤
        </button>
      </div>
    </div>
  );
} 