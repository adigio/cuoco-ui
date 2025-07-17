"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import "./reset-password.css";
import Button from "@/components/shared/form/Button";
import ChefLoader from "@/components/shared/loaders/ChefLoader";
import Input from "@/components/shared/form/Input";
import { useAuthStore } from "@/store/useAuthStore";
import { resetPassword } from "@/services/auth.service";
import NotificationModal from "@/components/shared/modal/NotificationModal";
import { useNotification } from "@/hooks/useNotification";

export default function ResetPassword() {
  const router = useRouter();
  
  const { 
    message, 
    additionalMessage, 
    type, 
    show, 
    showSuccess, 
    showError, 
    clearNotification 
  } = useNotification();

  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: ""
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      setLoading(true); 

      const response = await resetPassword(formData.email);
      
      showSuccess(
        "¡Listo! Revisa tu email", 
        "Si los datos son correctos, recibirás un enlace para restablecer tu contraseña. Si no recibes el email, revisa tu carpeta de spam o intenta nuevamente."
      );
      
    } catch (error: any) {
      const mainMessage = "Error al iniciar sesión";
      const backendMsg = error?.message || "Verifica tus credenciales e intenta nuevamente";
      
      // Mostrar error con mensaje del backend
      showError(mainMessage, backendMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen w-full overflow-hidden">
      {loading && (
        <div className="signin-loader-wrapper">
          <ChefLoader text="" />
        </div>
      )}

      <div className="min-h-screen bg-[url('/auth/signin-mobile.png')] md:bg-[url('/auth/signin.png')] bg-cover bg-no-repeat bg-center flex items-center justify-center md:justify-end px-4 md:px-16">
        <div className="bg-white/90 rounded-3xl p-6 w-full md:max-w-md min-h-[550px] space-y-4 shadow-xl mx-4 md:mx-0 flex flex-col justify-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-center">
            ¿Olvidaste tu contraseña?
          </h2>
            <p className="text-gray-600 text-sm text-center">
              Ingresa tu dirección de email y te enviaremos un enlace para restablecer tu contraseña.
            </p>
          <form className="flex flex-col space-y-4" onSubmit={handleSubmit}>
            <Input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              label="Email"
              placeholder="juan@gmail.com"
              required
              disabled={loading}
            />

            <Button
              type="submit"
              variant="primary"
              fullWidth
              disabled={loading}
            >
              Continuar
            </Button>
          </form>
        </div>
      </div>

      <NotificationModal
        show={show}
        onClose={clearNotification}
        message={message}
        additionalMessage={additionalMessage}
        type={type}
      />
    </div>
  );
}
