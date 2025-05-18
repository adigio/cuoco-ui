'use client';

import React from 'react';

export default function Login() {
  return (
    <div className="min-h-screen bg-[url('/fondo-ingredientes-signup.png')] bg-cover bg-no-repeat bg-center px-4 py-10 flex items-center justify-center">
      <div className="bg-white/90 rounded-3xl p-6 max-w-xl w-full space-y-4 shadow-xl backdrop-blur">
      <h2 className="text-2xl font-semibold mb-6 text-center">Bienvenido de nuevo</h2>
      
      <form className="flex flex-col space-y-4" onSubmit={(e) => e.preventDefault()}>
        <label htmlFor="email" className="font-medium">Email</label>
        <input
          type="email"
          id="email"
          placeholder="juan@gmail.com"
          required
          className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <label htmlFor="password" className="font-medium">Contraseña</label>
        <input
          type="password"
          id="password"
          placeholder="*********************"
          required
          className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <a href="#" className="text-sm text-blue-600 hover:underline self-end">
          ¿Olvidaste tu contraseña?
        </a>

        <button
          type="submit"
          className="bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
        >
          Iniciar Sesión
        </button>
      </form>

      <p className="mt-4 text-center text-sm">
        No tienes cuenta?{' '}
        <a href="/signup" className="text-blue-600 hover:underline">
          Registrate
        </a>
      </p>

      <div className="mt-6 flex flex-col gap-3">
        <button
          className="bg-red-600 text-white py-2 rounded-md hover:bg-red-700 transition"
        >
          Iniciar sesión con Google
        </button>
        <button
          className="bg-blue-800 text-white py-2 rounded-md hover:bg-blue-900 transition"
        >
          Iniciar sesión con Facebook
        </button>
      </div>
    </div>
    </div>
  );
}
