"use client";

import React, { useState } from "react";

export default function RecipeIngredientInput({ setIngredients }) {
  const [inputValue, setInputValue] = useState("");

  const normalizar = (texto) => texto.trim().toLowerCase();
  
  const agregarIngrediente = (nombre, fuente = "manual", confirmado = true) => {
    const nuevoNombre = normalizar(nombre);
    if (!nuevoNombre) return;

    setIngredients((prev) => {
      const yaExiste = prev.some(
        (ing) => normalizar(ing.nombre) === nuevoNombre
      );
      if (yaExiste) return prev;

      const nuevo = { nombre: nombre.trim(), fuente, confirmado };
      return [...prev, nuevo];
    });
    setInputValue("");
  };

  const handleInputChange = (e) => setInputValue(e.target.value);

  const handleIngredientKeyPress = (e) => {
    if (e.key === "Enter") {
      e.preventDefault(); // evita submit en formularios
      agregarIngrediente(inputValue);
    }
  };

  const handleAddClick = () => {
    agregarIngrediente(inputValue);
  };
  /*
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
      agregarIngrediente(transcript, 'voz', false);
    };
  };
*/
  return (
    <div>
      <h2 className="text-lg font-medium">
        También podés escribir o decir qué tenés
      </h2>
      <div className="flex gap-2 mt-2 flex-wrap items-center">
        <input
          type="text"
          placeholder="Ej: Leche, Huevos..."
          value={inputValue}
          onChange={handleInputChange}
          onKeyDown={handleIngredientKeyPress}
          className="border rounded px-4 py-2 w-full max-w-md"
        />
        {/* <button
          onClick={handleVoiceInput}
          className="bg-gray-200 px-4 py-2 rounded-full text-xl"
          title="Reconocimiento de voz"
        >
          🎤
        </button> */}

        <button
          onClick={handleAddClick}
          className="bg-purple-300 text-white px-4 py-2 rounded-full text-xl"
          title="Agregar ingrediente"
        >
          +
        </button>
      </div>
    </div>
  );
}
