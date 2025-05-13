'use client'

import { useState } from 'react'
import Modal from '@/components/Modal'
import RegisterStepper from '@/components/RegisterStepper'

export default function SignupPage() {
  const [currentStep, setCurrentStep] = useState('email')
  const [completedSteps, setCompletedSteps] = useState([])

  const handleComplete = (step) => {
    setCompletedSteps([...completedSteps, step])
    setCurrentStep(null)
  }

  return (
    <div className="min-h-screen bg-[url('/fondo-ingredientes.png')] bg-cover bg-no-repeat bg-center">
      <div className="max-w-xl mx-auto mt-16 p-8 rounded-3xl shadow-xl bg-white/80 backdrop-blur-sm space-y-6">
        <h2 className="text-xl font-bold text-gray-700 text-center">
          Registrate y encontrá recetas fáciles, ricas y para todos los días.
        </h2>

        {/* Paso 1 */}
        <button
          onClick={() => setCurrentStep('email')}
          className="w-full flex justify-between items-center p-4 rounded-xl bg-red-100 hover:bg-red-200"
          disabled={completedSteps.includes('email')}
        >
          <span className="font-medium">Agregá tu e-mail</span>
          {completedSteps.includes('email') ? '✓' : 'Agregar'}
        </button>

        {/* Paso 2 */}
        <button
          onClick={() => setCurrentStep('prefs')}
          className="w-full flex justify-between items-center p-4 rounded-xl bg-green-100 hover:bg-green-200"
          disabled={!completedSteps.includes('email')}
        >
          <span className="font-medium">Elegí tus preferencias</span>
          {completedSteps.includes('prefs') ? '✓' : 'Elegí'}
        </button>

        {/* Paso 3 */}
        <button
          onClick={() => setCurrentStep('password')}
          className="w-full flex justify-between items-center p-4 rounded-xl bg-purple-100 hover:bg-purple-200"
          disabled={!completedSteps.includes('prefs')}
        >
          <span className="font-medium">Creá tu contraseña</span>
          {completedSteps.includes('password') ? '✓' : 'Crear'}
        </button>
      </div>

      {/* Modales */}
      <Modal isOpen={currentStep === 'email'} onClose={() => setCurrentStep(null)}>
        <RegisterStepper step={1} onComplete={() => handleComplete('email')} />
      </Modal>

      <Modal isOpen={currentStep === 'prefs'} onClose={() => setCurrentStep(null)}>
        <RegisterStepper step={2} onComplete={() => handleComplete('prefs')} />
      </Modal>

      <Modal isOpen={currentStep === 'password'} onClose={() => setCurrentStep(null)}>
        <RegisterStepper step={3} onComplete={() => handleComplete('password')} />
      </Modal>
    </div>
  )
}
