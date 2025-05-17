// pages/recipe/[id].jsx
"use client";
import React from "react";
import { getRecipeById } from '@/services/recipeService';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function RecipeDetailsPage() {
    const router = useRouter();
    const { id } = router.query;
    const [recipe, setRecipe] = useState (null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!id || Array.isArray(id)) return; // Evita cargar si el id no está disponible

        const fetchRecipe = async () => {
            const data = await getRecipeById(id);
            setRecipe(data);
            setLoading(false);
        };

        fetchRecipe();
    }, [id]);

    if (loading) return <p>Cargando receta...</p>;
    if (!recipe) return <p>Receta no encontrada</p>;

    return (
        <div>
            <h1>{recipe.title}</h1>
            <h2>Paso a paso:</h2>
            <ol>
                {recipe.steps.map((step, index) => (
                    <li key={index}>{step}</li>
                ))}
            </ol>
        </div>
    );
}
