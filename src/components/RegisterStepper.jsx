'use client'

import { useState } from 'react';
export default function RegisterStepper({ step, onComplete }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [diet, setDiet] = useState('')
  const [level, setLevel] = useState('')

  // Paso 1
  if (step === 1) {
    return (
      <div className="space-y-4">
        <label className="text-lg font-bold">Ingresá tu e-mail</label>
        <input type="email" className="w-full p-3 border rounded-xl" value={email} onChange={(e) => setEmail(e.target.value)} />
        <button className="w-full bg-[#F9827D] text-white py-2 rounded-xl" onClick={onComplete}>
          Continuar
        </button>
      </div>
    )
  }

  // Paso 2
  if (step === 2) {
    return (
      <div className="space-y-4">
        <label className="text-lg font-bold">Preferencias alimentarias</label>
        {/* lo que ya tenés */}
        <button className="w-full bg-[#F9827D] text-white py-2 rounded-xl" onClick={onComplete}>
          Guardar preferencias
        </button>
      </div>
    )
  }

  // Paso 3
  if (step === 3) {
    return (
      <div className="space-y-4">
        <label className="text-lg font-bold">Creá tu contraseña</label>
        <input type="password" className="w-full p-3 border rounded-xl" value={password} onChange={(e) => setPassword(e.target.value)} />
        <button className="w-full bg-green-600 text-white py-2 rounded-xl" onClick={onComplete}>
          Finalizar registro
        </button>
      </div>
    )
  }

  return null
}
