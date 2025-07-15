"use client";

import Input from "@/components/shared/form/Input";
import Checkbox from "@/components/shared/form/Checkbox";
import { useAuthStore } from "@/store/useAuthStore";
import { useRouter } from "next/navigation";
import PreferencesContainer from "../shared/preferences/PreferencesContainer";
import { RegisterStepperProps } from "@/types/components/register-steppers.types";
import { useRegisterStore } from "@/store/useRegisterStore";
import { useState } from "react";
import { register } from "@/services/auth.service";
import { useRegistrationNotification } from "@/context/RegistrationProvider";
export default function RegisterStepper({
  step,
  onComplete,
  onBack,
  onError,
}: RegisterStepperProps) {
  const router = useRouter();
  const {
    name,
    setName,
    email,
    setEmail,
    password,
    setPassword,
    confirmPass,
    setConfirmPass,
    cookingLevel,
    diet,
    foodNeeds,
    termsAccepted,
    setTermsAccepted,
    allergies,
    reset,
  } = useRegisterStore();

  const login = useAuthStore((state) => state.login); 
  const { 
    showSuccess, 
    showError, 
  } = useRegistrationNotification();
  const handlePasswordStepComplete = async () => {
    try {
      const userData = {
        name,
        email,
        password,
        plan_id: 1,
        cook_level_id: cookingLevel,
        diet_id: diet,
        dietary_needs: foodNeeds,
        allergies,
      };

      const response = await register(userData);

      showSuccess(
        "¡Tu cuenta ha sido creada exitosamente!", 
        "Serás redirigido al login automáticamente..."
      );
      
      // Limpiar el estado del registro
      reset();
      
      setTimeout(() => {
        router.push("/signin");
      }, 5000); 
      
    } catch (error: any) {
      
      const mainMessage = "Error al crear la cuenta";
      let backendMessage = "Verifica los datos e intenta nuevamente";
      
      if (error.response?.data?.errors) {
        const errorMessages = error.response.data.errors.map((err: any) => err.message).join(', ');
        backendMessage = errorMessages;
      } else if (error.message) {
        backendMessage = error.message;
      }
      
      // Cerrar el modal del stepper primero para que se vea el error
      if (onError) {
        onError();
      }

      setTimeout(() => {
        showError(mainMessage, backendMessage);
      }, 200);
    }
  };

  const centeredWrapperClass =
    "flex flex-col justify-center items-center min-h-[40vh] px-4";

  // STEP 1: E-mail
  if (step === 1) {
    return (
      <div className={centeredWrapperClass}>
        <div className="space-y-4 text-left w-full max-w-md">
          <h4 className="text-2xl font-bold text-gray-800">Nombre</h4>
          <Input
            type="text"
            name="name"
            value={name}
            onChange={(e) => { 
              setName(e.target.value);
            }}
            placeholder="nombre"
            required
            inputClassName="rounded-xl p-3 text-gray-800"
          />
          <h4 className="text-2xl font-bold text-gray-800">
            Ingresá tu e-mail
          </h4>
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
              if (email.includes("@") && termsAccepted) onComplete();
            }}
            className="w-full bg-[#F5807B] hover:bg-[#F5807B] text-white font-semibold py-2 rounded transition"
          >
            Continuar
          </button>
        </div>
      </div>
    );
  }

  // STEP 2: Preferencias
  if (step === 2) {
    return (
      <div className={centeredWrapperClass}>
        <div className="w-full max-w-md">
          <PreferencesContainer
            initialPreferences={{
              cook_level: cookingLevel,
              diet,
              dietaryRestrictions: foodNeeds,
              allergies,
              favourite_cuisines: [],
            }}
            onComplete={() => {
              onComplete();
            }}
            showBackButton={true}
            title="Personaliza tus recetas"
            submitButtonText="Continuar"
          />
        </div>
      </div>
    );
  }

  // STEP 3: Contraseña
  if (step === 3) {
    const valid =
      password.length >= 8 &&
      /[0-9]/.test(password) &&
      !/1234|abcd/i.test(password);

    return (
      <div className={centeredWrapperClass}>
        <div className="space-y-4 text-left w-full max-w-md">
          <h3 className="text-2xl font-bold text-gray-800">
            Creá tu contraseña
          </h3>
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
              disabled={!valid}
            />
            <Checkbox
              id="sequence-check"
              name="sequence-check"
              checked={valid}
              onChange={() => {}}
              label="Sin secuencias como 1234 o ABCD"
              disabled={!valid}
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
          <div className="flex gap-4 mt-4">
            {onBack && (
              <button
                onClick={onBack}
                className="flex-1 bg-gray-200 text-gray-800 px-6 py-2 rounded hover:bg-gray-300 transition"
              >
                Atrás
              </button>
            )}
            <button
              onClick={() => {
                if (password === confirmPass && valid)
                  handlePasswordStepComplete();
              }}
              className="flex-1 bg-[#B362D8] hover:opacity-80 text-white font-semibold py-2 rounded transition"
            >
              Finalizar
            </button>
          </div>
        </div>
      </div>
    );
  }

  return null;
}
