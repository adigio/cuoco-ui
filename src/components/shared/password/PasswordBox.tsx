"use client";

import Input from "@/components/shared/form/Input";
import Checkbox from "@/components/shared/form/Checkbox";
import { useAuthStore } from "@/store/useAuthStore";
import { useRouter } from "next/navigation";
import PreferencesContainer from "../preferences/PreferencesContainer";
import { RegisterStepperProps } from "@/types/components/register-steppers.types";
import { useRegisterStore } from "@/store/useRegisterStore";
import { useState } from "react";
import { register } from "@/services/auth.service";
import { useRegistrationNotification } from "@/context/RegistrationProvider";
import { PasswordBoxProps } from "@/types/components/password.types";

export default function PasswordBox({
	title,
  subtitle,
  successTitle,
  handleSubmit,
  cancelTitle,
  onBack,
  onError,
}: PasswordBoxProps) {
	
  const [password, setPassword] = useState("");
  const [confirmPass, setConfirmPass] = useState("");

  const centeredWrapperClass = "flex flex-col justify-center items-center min-h-[40vh] px-4";

  const valid = password.length >= 8 && /[0-9]/.test(password) && !/1234|abcd/i.test(password);

  return (
    <div className={centeredWrapperClass}>
      <div className="space-y-4 text-left w-full max-w-md">
        <h3 className="text-2xl font-bold text-gray-800">
          {title ? title : "Creá tu contraseña"}
        </h3>
        <p className="text-sm text-gray-500">{subtitle ? subtitle : "Mantené tu cuenta protegida."}</p>
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
              {cancelTitle ? cancelTitle : "Atrás"}
            </button>
          )}
          <button
            onClick={() => {
              if (password === confirmPass && valid)
                handleSubmit(password);
            }}
            className="flex-1 bg-[#B362D8] hover:opacity-80 text-white font-semibold py-2 rounded transition"
          >
            {successTitle ? successTitle : "Siguiente"}
          </button>
        </div>
      </div>
    </div>
  );
}
