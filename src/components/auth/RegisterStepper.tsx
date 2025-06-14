"use client";

import { useState, SetStateAction } from "react";
import Input from "@/components/shared/form/Input";
import Checkbox from "@/components/shared/form/Checkbox";
import { useAuthStore } from "@/store/useAuthStore";
import axios from "axios";
import PreferencesContainer from "../shared/preferences/PreferencesContainer";
import { RegisterStepperProps } from "@/types/components/register-steppers.types";  

export default function RegisterStepper({
  step,
  onComplete,
  onBack,
}: RegisterStepperProps) {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const [cookingLevel, setCookingLevel] = useState<number>(2);
  const [diet, setDiet] = useState<number>(1);
  const [foodNeeds, setFoodNeeds] = useState<number[]>([]);
  const [allergies, setAllergies] = useState<number[]>([]);
  const [termsAccepted, setTermsAccepted] = useState(false);

  const login = useAuthStore((state) => state.login);

  const handlePasswordStepComplete = async () => {
    try {
      console.log('email',  email,'nombre', name, 'pasword',
        password, 
         'nivel cocina', cookingLevel,
        'dieta',  diet,
        'needs',  foodNeeds,
        'alergias',  allergies,);
      const userData = {
        email,
        password,
        preferences: {
          cookingLevel,
          diet,
          dietaryRestrictions: foodNeeds,
          allergies,
          favoriteCuisines: [],
        },
      };

      const { data } = await axios.post("/api/register", userData);

      login({
        name: data.user.name,
        email: data.user.email,
        premium: data.user.premium,
        token: data.user.token,
        preferences: {
          cookingLevel: data.user.preferences.cookingLevel,
          diet: data.user.preferences.diet,
          dietaryRestrictions: data.user.preferences.dietaryRestrictions,
          allergies: data.user.preferences.allergies,
          favoriteCuisines: [],
        },
      });

      onComplete();
    } catch (error) {
      console.error("Error en el registro:", error);
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
            onChange={(e) => setName(e.target.value)}
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
              cookingLevel,
              diet,
              dietaryRestrictions: foodNeeds,
              allergies,
              favoriteCuisines: [],
            }}
            onComplete={(preferences) => {
              if (preferences.cookingLevel) {
                setCookingLevel(
                  preferences.cookingLevel as SetStateAction<
                    "Bajo" | "Medio" | "Alto"
                  >
                );
              }
              if (preferences.diet) {
                setDiet(
                  preferences.diet as SetStateAction<
                    "Omnívoro" | "Vegetariano" | "Vegano" | "Otro"
                  >
                );
              }
              if (preferences.dietaryRestrictions) {
                setFoodNeeds(preferences.dietaryRestrictions);
              }
              if (preferences.allergies) {
                setAllergies(preferences.allergies);
              }
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
