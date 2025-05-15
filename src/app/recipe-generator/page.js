'use client';

import Footer from '@/components/landing/Footer';
import NavbarLanding from '@/components/navbars/NavbarLanding';
import React, { useState } from 'react';

export default function RecipeGeneratorPage() {
    const [images, setImages] = useState([]);
    const [ingredient, setIngredient] = useState('');
    const [ingredients, setIngredients] = useState([]);

    const handleImageUpload = (e) => {
        const files = Array.from(e.target.files);
        setImages(prev => [...prev, ...files]);
        console.log("files", files);
    };

    const handleInputChange = (e) => {
        setIngredient(e.target.value);
    };

    const handleIngredientKeyPress = (e) => {
        if (e.key === 'Enter' && ingredient.trim() !== '') {
            e.preventDefault();
            setIngredients(prev => [...prev, ingredient.trim()]);
            setIngredient('');
        }
    };

    const handleVoiceInput = () => {
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

        if (!SpeechRecognition) {
            alert('Tu navegador no soporta reconocimiento de voz.');
            return;
        }

        const recognition = new SpeechRecognition();
        recognition.lang = 'es-ES';
        recognition.interimResults = false;
        recognition.maxAlternatives = 1;

        recognition.start();

        recognition.onresult = (event) => {
            const transcript = event.results[0][0].transcript;
            setIngredients(prev => [...prev, transcript.trim()]);
        };

        recognition.onerror = (event) => {
            console.error('Error de reconocimiento de voz:', event.error);
        };
    };

    const handleRemoveIngredient = (indexToRemove) => {
        setIngredients(prev => prev.filter((_, index) => index !== indexToRemove));
    };



    return (
        <div className="min-h-screen overflow-x-hidden">    
            <NavbarLanding />
            <main className="min-h-screen p-8 mt-25 bg-[#fefefe]">
                {/* Encabezado */}
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-3xl font-semibold">Subí una foto de tu heladera o alacena</h1>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Upload box */}
                    <div className="border-2 border-dashed border-red-300 p-6 rounded-md text-center">
                        <input
                            type="file"
                            accept="image/*"
                            multiple
                            onChange={handleImageUpload}
                            className="hidden"
                            id="upload-input"
                        />
                        <label htmlFor="upload-input" className="cursor-pointer text-blue-600">
                            Arrastrá tus archivos aquí, o <span className="underline">haz clic</span>
                        </label>
                        <p className="text-sm text-gray-500 mt-2">SVG, PNG, JPG o GIF (max. 800x400px)</p>
                    </div>

                    {/* Vista previa de imágenes */}
                    <div className="bg-white shadow rounded p-4 overflow-y-auto max-h-[400px]">
                        <h2 className="font-semibold mb-4">Tus imagenes</h2>
                        {images.length === 0 && <p className="text-gray-400">No se han subido imágenes.</p>}
                        <div className="flex flex-col gap-4">
                            {images.map((img, idx) => (
                                <img
                                    key={idx}
                                    src={URL.createObjectURL(img)}
                                    alt={`imagen-${idx}`}
                                    className="w-full object-cover rounded shadow"
                                />
                            ))}
                        </div>
                    </div>
                </div>

                {/* Ingredientes */}
                <div className="mt-10">
                    <h2 className="text-lg font-medium mb-2">También podés decirnos o escribir qué tenés</h2>
                    <div className="flex items-center gap-4 flex-wrap">
                        <input
                            type="text"
                            placeholder="Ingredientes"
                            value={ingredient}
                            onChange={handleInputChange}
                            onKeyDown={handleIngredientKeyPress}
                            className="border rounded px-4 py-2 w-full max-w-md"
                        />
                        <button
                            onClick={handleVoiceInput}
                            className="bg-gray-200 p-4 rounded-full text-2xl"
                            title="Decir ingredientes"
                        >
                            🎤
                        </button>
                    </div>

                    {/* Lista de ingredientes (chips) */}
                    <div className="flex flex-wrap gap-2 mt-4">
                        {ingredients.map((item, idx) => (
                            <span
                                key={idx}
                                className="bg-gray-200 text-sm px-3 py-1 rounded-full flex items-center gap-2"
                            >
                                {item}
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

                <div className="flex justify-between mt-10">
                    <button className="bg-gray-300 text-gray-700 px-6 py-2 rounded cursor-pointer">Atrás</button>
                    <button className="bg-[#f37b6a] text-white px-6 py-2 rounded cursor-pointer">Continuar</button>
                </div>
            </main>
            <Footer />
        </div>
    );
}
