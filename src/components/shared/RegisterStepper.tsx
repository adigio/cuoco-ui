'use client'

import { useState } from 'react'
import Input from '@/components/shared/form/Input'
import Checkbox from '@/components/shared/form/Checkbox'
import { useAuthStore } from '@/store/useAuthStore';
import axios from 'axios';

interface RegisterStepperProps {
  step: number;
  onComplete: () => void;
}

export default function RegisterStepper({ step, onComplete }: RegisterStepperProps) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPass, setConfirmPass] = useState('')
  const [level, setLevel] = useState('')
  const [diet, setDiet] = useState('')
  const [foodNeeds, setFoodNeeds] = useState<string[]>([])
  const [allergies, setAllergies] = useState<string[]>([])
  const [subStep, setSubStep] = useState(1)
  const [termsAccepted, setTermsAccepted] = useState(false)

  const toggleItem = (list: string[], setList: React.Dispatch<React.SetStateAction<string[]>>, item: string) => {
    setList((prev) => (prev.includes(item) ? prev.filter((i) => i !== item) : [...prev, item]))
  }

  const login = useAuthStore(state => state.login);

  const handlePasswordStepComplete = async () => {
    try {
      const userData = {
        email,
        password,
        level,
        diet,
        foodNeeds,
        allergies
      };
  
      //TODO: extraerlo a un service
      const { data } = await axios.post('/api/register', userData);
      
      login({
        name: data.user.name,
        email: data.user.email,
        premium: data.user.premium,
        token: data.user.token
      });
      
      onComplete();
    } catch (error) {
      console.error('Error en el registro:', error);
    }
  };

  const centeredWrapperClass = "flex flex-col justify-center items-center min-h-[60vh] px-4"

  // STEP 1: E-mail
  if (step === 1) {
    return (
      <div className={centeredWrapperClass}>
        <div className="space-y-4 text-left w-full max-w-md">
          <h3 className="text-2xl font-bold text-gray-800">Ingresá tu e-mail</h3>
          <p className="text-gray-500">Asegurate de tener acceso a él.</p>
          <Input
            type="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="E-mail"
            required
            inputClassName="rounded-xl p-3 text-gray-800"
          />
          <Checkbox
            id="terms"
            name="terms"
            checked={termsAccepted}
            onChange={() => setTermsAccepted(!termsAccepted)}
            label="Acepto los Términos y condiciones y autorizo el uso de mis datos de acuerdo a la Declaración de privacidad."
            className="items-start"
            checkboxClassName="mt-1 accent-[#F5807B]"
            labelClassName="text-sm text-gray-600"
          />
          <button
            onClick={() => {
              if (email.includes('@') && termsAccepted) onComplete()
            }}
            className="w-full bg-[#F5807B] hover:bg-[#F5807B] text-white font-semibold py-2 rounded transition"
          >
            Continuar
          </button>
        </div>
      </div>
    )
  }

  // STEP 2: Preferencias
  if (step === 2) {
    return (
      <div className={centeredWrapperClass}>
        <div className="space-y-4 w-full max-w-md">
          {subStep === 1 && (
            <>
              <h3 className="text-xl font-semibold text-gray-800">¿Cómo es tu alimentación?</h3>
              <label className="block font-medium mt-2">Nivel de cocina:</label>
              <div className="flex gap-2">
                {['Bajo', 'Medio', 'Alto'].map((nivel) => (
                  <button
                    key={nivel}
                    className={`px-4 py-2 rounded-full border ${
                      level === nivel ? 'bg-[#75C24B] text-white' : 'bg-white text-gray-700'
                    }`}
                    onClick={() => setLevel(nivel)}
                  >
                    {nivel}
                  </button>
                ))}
              </div>

              <label className="block font-medium mt-4">Dieta según estilo alimentario:</label>
              <div className="space-y-2">
                {['Omnívoro', 'Vegetariano', 'Vegano', 'Otro'].map((d) => (
                  <label key={d} className="flex items-center gap-2">
                    <input type="radio" name="diet" value={d} checked={diet === d} onChange={() => setDiet(d)} />
                    <span>{d}</span>
                  </label>
                ))}
              </div>
            </>
          )}

          {subStep === 2 && (
            <>
              <h3 className="text-xl font-semibold text-gray-800">¿Tenés alguna necesidad alimentaria especial?</h3>
              <div className="space-y-2">
                {['Sin gluten', 'Sin lactosa', 'Alta en proteínas', 'Keto', 'Ninguna en particular'].map((item) => (
                  <Checkbox
                    key={item}
                    id={`food-need-${item}`}
                    name={`food-need-${item}`}
                    checked={foodNeeds.includes(item)}
                    onChange={() => toggleItem(foodNeeds, setFoodNeeds, item)}
                    label={item}
                  />
                ))}
              </div>
            </>
          )}

          {subStep === 3 && (
            <>
              <h3 className="text-xl font-semibold text-gray-800">¿Qué ingredientes evitás o te generan alergia?</h3>
              <div className="space-y-2">
                {['Leche', 'Frutos secos', 'Soja', 'Crustáceos', 'Huevo', 'Pescados', 'Cereales', 'Maní', 'Otro', 'Ninguna en particular'].map(
                  (item) => (
                    <Checkbox
                      key={item}    
                      id={`allergy-${item}`}
                      name={`allergy-${item}`}
                      checked={allergies.includes(item)}
                      onChange={() => toggleItem(allergies, setAllergies, item)}
                      label={item}
                    />
                  )
                )}
              </div>
            </>
          )}

          <div className="flex justify-between pt-4">
            {subStep > 1 ? (
              <button className="bg-gray-200 text-gray-800 px-6 py-2 rounded hover:bg-gray-300 transition" onClick={() => setSubStep(subStep - 1)}>
                Atrás
              </button>
            ) : (
              <div></div>
            )}
            
            {subStep < 3 ? (
              <button className="bg-[#f37b6a] text-white px-6 py-2 rounded hover:bg-[#e36455] transition" onClick={() => setSubStep(subStep + 1)}>
                Siguiente
              </button>
            ) : (
              <button
                className="bg-[#f37b6a] text-white px-6 py-2 rounded hover:bg-[#e36455] transition"
                onClick={() => onComplete()}
              >
                Guardar preferencias
              </button>
            )}
          </div>

          <div className="flex justify-center mt-2 gap-2">
            {[1, 2, 3].map((n) => (
              <span key={n} className={`w-3 h-3 rounded-full ${n === subStep ? 'bg-[#75C24B]' : 'bg-gray-300'}`}></span>
            ))}
          </div>
        </div>
      </div>
    )
  }

  // STEP 3: Contraseña
  if (step === 3) {
    const valid = password.length >= 8 && /[0-9]/.test(password) && !/1234|abcd/i.test(password)

    return (
      <div className={centeredWrapperClass}>
        <div className="space-y-4 text-center w-full max-w-md">
          <h3 className="text-2xl font-bold text-gray-800">Creá tu contraseña</h3>
          <p className="text-sm text-gray-500">Mantené tu cuenta protegida.</p>
          <Input
            type="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Contraseña"
            required
            inputClassName="rounded-xl p-3"
          />
          <div className="text-left text-sm text-gray-700 space-y-1">
            <Checkbox
              id="valid-check"
              name="valid-check"
              checked={valid}
              onChange={() => {}}
              label="Mínimo 8 caracteres con letras y números"
              disabled={true}
            />
            <Checkbox
              id="sequence-check"
              name="sequence-check"
              checked={!/1234|abcd/i.test(password)}
              onChange={() => {}}
              label="Sin secuencias como 1234 o ABCD"
              disabled={true}
            />
          </div>
          <Input
            type="password"
            name="confirmPassword"
            value={confirmPass}
            onChange={(e) => setConfirmPass(e.target.value)}
            placeholder="Confirmar contraseña"
            required
            inputClassName="rounded-xl p-3"
          />
          <button
            onClick={() => {
              if (password === confirmPass && valid) handlePasswordStepComplete()
            }}
            className="w-full bg-[#B362D8] hover:opacity-80  text-white font-semibold py-2 rounded transition"
          >
            Finalizar
          </button>
        </div>
      </div>
    )
  }

  return null
}
