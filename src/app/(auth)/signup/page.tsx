"use client";

import {
  EnvelopeIcon,
  HandThumbUpIcon,

  LockClosedIcon
} from '@heroicons/react/24/outline'
import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import RegisterStepper from '@/components/auth/RegisterStepper'
import RegisterStepBox from '@/components/auth/RegisterStepBox'
import Modal from '@/components/shared/modal/Modal'
import NotificationModal from '@/components/shared/modal/NotificationModal'
import { useNotification } from '@/hooks/useNotification'
import { RegistrationProvider } from '@/context/RegistrationProvider'

type StepKey = "email" | "prefs" | "password";

const stepOrder: StepKey[] = ["email", "prefs", "password"];

export default function SignupPage() {
  const [currentStep, setCurrentStep] = useState<StepKey | null>(null)
  const [completedSteps, setCompletedSteps] = useState<StepKey[]>([])
  const [registerFinished, setRegisterFinished] = useState<boolean>(false)
  
  // Hook para notificaciones globales de la página
  const notificationHook = useNotification()
  const { 
    message, 
    additionalMessage, 
    type, 
    show, 
    clearNotification 
  } = notificationHook


  const handleComplete = (step: StepKey) => {
    setCompletedSteps((prev) => {
      const updated = [...prev, step];
      if (
        updated.includes("email") &&
        updated.includes("prefs") &&
        updated.includes("password")
      ) {
        setRegisterFinished(true);
      }
      return updated;
    });
    setCurrentStep(null);
  };

  const handleBack = (fromStep: StepKey) => {
    const currentIndex = stepOrder.indexOf(fromStep);
    if (currentIndex > 0) {
      const previousStep = stepOrder[currentIndex - 1];
      setCompletedSteps((prev) => prev.filter((step) => step !== previousStep));
      setCurrentStep(previousStep);
    }
  };

  return (
    <RegistrationProvider notificationHook={notificationHook}>
      <div className="min-h-screen bg-[url('/auth/signup.png')] bg-cover bg-no-repeat bg-center flex items-center justify-center px-4 md:px-16">
        <div className="flex flex-col items-center justify-start">
        <div className="relative w-48 h-48 mb-8">
             <Link href="/">
          <Image
            src="/logos/logo_coral.png"
            alt="Cuoco Logo"
            fill
            className="object-contain"
          />
          </Link>
        </div>
        {registerFinished ? (
          <div className="text-center space-y-4">
            <h2 className="text-2xl font-bold text-gray-800">
              ¡Registro completo!
            </h2>
            <p className="text-gray-600">Ya podés empezar a usar la app</p>
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
        <div className="bg-white/90 rounded-3xl p-6 w-full md:max-w-md space-y-4 shadow-xl mx-4 md:mx-0">
          <RegisterStepBox
            icon={EnvelopeIcon}
            title="Agregá tu e-mail y nombre"
            description="Recibirás información de tu cuenta."

            buttonText="Agregar"
            onClick={() => setCurrentStep("email")}
            completed={completedSteps.includes("email")}
            color="#F5807B"
          />

          {completedSteps.includes("email") && (
            <RegisterStepBox
              icon={HandThumbUpIcon}
              title="Elegí tus preferencias"
              description="Personalizá tus recetas según tus gustos y necesidades"
              buttonText="Elegí"
              onClick={() => setCurrentStep("prefs")}
              disabled={!completedSteps.includes("email")}
              completed={completedSteps.includes("prefs")}
              color="#75C24B"
            />
          )}

          {completedSteps.includes("prefs") && (
            <RegisterStepBox
              icon={LockClosedIcon}
              title="Creá tu contraseña"
              description="Mantendrás tu cuenta protegida"
              buttonText="Crear"
              onClick={() => setCurrentStep("password")}
              disabled={!completedSteps.includes("prefs")}
              completed={completedSteps.includes("password")}
              color="#B362D8"
            />
          )}
        </div>

        <Modal
          isOpen={currentStep === "email"}
          onClose={() => setCurrentStep(null)}
          showCloseButton={true}
        >
          <RegisterStepper
            key="email"
            step={1}
            onComplete={() => handleComplete("email")}
          />
        </Modal>

        <Modal
          isOpen={currentStep === "prefs"}
          onClose={() => setCurrentStep(null)}
          showCloseButton
        >
          <RegisterStepper
            key="prefs"
            step={2}
            onComplete={() => handleComplete("prefs")}
            onBack={() => handleBack("prefs")}
          />
        </Modal>

        <Modal
          isOpen={currentStep === "password"}
          onClose={() => setCurrentStep(null)}
          showCloseButton
        >
          <RegisterStepper 
            key="password" 
            step={3} 
            onComplete={() => handleComplete('password')} 
            onBack={() => handleBack('password')}
            onError={() => setCurrentStep(null)} // Cerrar modal en caso de error
          />
        </Modal>

        {/* Modal de notificaciones global para errores del registro */}
        <NotificationModal
          show={show}
          onClose={clearNotification}
          message={message}
          additionalMessage={additionalMessage}
          type={type}
        />

              </div>
      </div>
    </RegistrationProvider>
  )
}
