'use client'

import {
  EnvelopeIcon,
  HandThumbUpIcon,
  LockClosedIcon
} from '@heroicons/react/24/outline'
import { useState } from 'react'
import Link from 'next/link'
import RegisterModal from '@/components/shared/RegisterModal'
import RegisterStepper from '@/components/shared/RegisterStepper'
import RegisterStepBox from '@/components/shared/RegisterStepBox'

export default function SignupPage() {
  const [currentStep, setCurrentStep] = useState(null)
  const [completedSteps, setCompletedSteps] = useState([])
  const [registerFinished, setRegisterFinished] = useState(false)

  const handleComplete = (step) => {
    setCompletedSteps((prev) => {
      const updated = [...prev, step]
      if (updated.includes('email') && updated.includes('prefs') && updated.includes('password')) {
        setRegisterFinished(true)
      }
      return updated
    })
    setCurrentStep(null)
  }

  return (
    <div className="min-h-screen bg-[url('/fondo-ingredientes-signup.png')] bg-cover bg-no-repeat bg-center px-4 py-10 flex items-center justify-center">
      <div className="bg-white/90 rounded-3xl p-6 max-w-xl w-full space-y-4 shadow-xl backdrop-blur">
        {registerFinished ? (
            <div className="text-center space-y-4">
                <h2 className="text-2xl font-bold text-gray-800">¡Registro completo!</h2>
                <p className="text-gray-600">Ya podés empezar a usar la app.</p>
                <Link
                href="/home"
                className="inline-block bg-[#f37b6a] text-white px-6 py-2 rounded hover:bg-[#e36455] transition"
                >
                Ir al Home
                </Link>
            </div>
        ) : (
            <h2 className="text-center text-xl font-bold text-gray-800">
                Registrate y encontrá recetas fáciles, ricas y para todos los días.
            </h2>
        )}


        <RegisterStepBox
            icon={EnvelopeIcon}
            title="Agregá tu e-mail"
            description="Recibirás información de tu cuenta."
            buttonText="Agregar"
            onClick={() => setCurrentStep('email')}
            completed={completedSteps.includes('email')}
            color="#F5807B"
        />

        {completedSteps.includes('email') && (
            <RegisterStepBox
                icon={HandThumbUpIcon}
                title="Elegí tus preferencias"
                description="Personalizá tus recetas según tus gustos y necesidades."
                buttonText="Elegí"
                onClick={() => setCurrentStep('prefs')}
                disabled={!completedSteps.includes('email')}
                completed={completedSteps.includes('prefs')}
                color="#75C24B"
            />
        )}

        {completedSteps.includes('prefs') && (
            <RegisterStepBox
                icon={LockClosedIcon}
                title="Creá tu contraseña"
                description="Mantendrás tu cuenta protegida."
                buttonText="Crear"
                onClick={() => setCurrentStep('password')}
                disabled={!completedSteps.includes('prefs')}
                completed={completedSteps.includes('password')}
                color="#B362D8"
            />
        )}
      </div>

      <RegisterModal isOpen={currentStep === 'email'} onClose={() => setCurrentStep(null)}>
          <RegisterStepper key="email" step={1} onComplete={() => handleComplete('email')} />
      </RegisterModal>

      <RegisterModal isOpen={currentStep === 'prefs'} onClose={() => setCurrentStep(null)}>
          <RegisterStepper key="prefs" step={2} onComplete={() => handleComplete('prefs')} />
      </RegisterModal>

      <RegisterModal isOpen={currentStep === 'password'} onClose={() => setCurrentStep(null)}>
        <RegisterStepper key="password" step={3} onComplete={() => handleComplete('password')} />
      </RegisterModal>

    </div>
  )
}
