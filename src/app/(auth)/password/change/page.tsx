"use client";
import React, { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import "./change-password.css";
import Modal from '@/components/shared/modal/Modal'
import ChefLoader from "@/components/shared/loaders/ChefLoader";
import NotificationModal from "@/components/shared/modal/NotificationModal";
import { useNotification } from "@/hooks/useNotification";
import PasswordBox from "@/components/shared/password/PasswordBox";
import { changePassword } from "@/services/auth.service";

export default function ChangePassword() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const token = searchParams.get('token')
  
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

  const handleSubmit = async (password: string) => {

    if (!token) {
      showError("Error", "El link no es válido. Vuelve a solicitar el cambio de contraseña e intenta nuevamente.");
      return;
    }

    try {
      setLoading(true); 

      const response = await changePassword(token, password);
      
      showSuccess(
        "¡Listo! Actualizamos tu contraseña", 
        "Te enviaremos al login para que puedas ingresar con tu nueva clave."
      );

      setTimeout(() => {
        router.push("/signin");
      }, 4000);
      
    } catch (error: any) {
      const mainMessage = "Error al cambiar la contraseña";
      const backendMsg = error?.message || "Verifica tus datos e intenta nuevamente";
      
      showError(mainMessage, backendMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[url('/auth/signup.png')] bg-cover bg-no-repeat bg-center flex items-center justify-center px-4 md:px-16">
      <div className="flex flex-col items-center justify-start">
            {loading && (
              <div className="signin-loader-wrapper">
                <ChefLoader text="" />
              </div>
            )}

            <Modal
              isOpen={true}
              onClose={() => {}}
            >
              <PasswordBox 
                title="Cambiar contraseña"
                subtitle="Crea una nueva contraseña para tu cuenta"
                cancelTitle="Cancelar"
                successTitle="Continuar"
                handleSubmit={handleSubmit}
                onBack={() => router.push("/signin")}
                onError={() => showError("Error", "Ocurrió un error al cambiar la contraseña")}
              />
            </Modal>

            <NotificationModal
              show={show}
              onClose={clearNotification}
              message={message}
              additionalMessage={additionalMessage}
              type={type}
            />

      </div>
    </div>
  );
}
