"use client";
import React, { useState, Suspense, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import ChefLoader from "@/components/shared/loaders/ChefLoader";
import NotificationModal from "@/components/shared/modal/NotificationModal";
import { useNotification } from "@/hooks/useNotification";
import { updateProfile } from "@/services/auth.service";
import { useAuthStore } from "@/store/useAuthStore";

function PaymentSuccessContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { user, updateUser } = useAuthStore();

  const externalReference = searchParams?.get('external_reference')
  
  const { 
    message, 
    additionalMessage, 
    type, 
    show, 
    showSuccess, 
    showError, 
    clearNotification 
  } = useNotification();

  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    handleSuccess();
  }, []);

  const handleSuccess = async () => {
    
    if (!externalReference) {
      showError("Error", "El link no es válido. Vuelve a intentarlo en unos instantes.");
      return;
    }

    try {
      setLoading(true); 

      const userData = {};

      const userResponse = await updateProfile(userData);

      if (userResponse) {
        userResponse.premium = userResponse?.plan?.id == 2;
        updateUser(userResponse)
      }

      showSuccess(
        "¡Listo! Ya sos premium", 
        "Te enviaremos a la home para que puedas continuar con los beneficios de Cuoco Premium."
      );

      setTimeout(() => {
        router.push("/home");
      }, 4000);
      
    } catch (error: any) {
      const mainMessage = "Error al procesar el pago";
      const backendMsg = error?.message || "Intenta nuevamente en unos instantes";
      
      showError(mainMessage, backendMsg);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-[url('/auth/signup.png')] bg-cover bg-no-repeat bg-center flex items-center justify-center px-4 md:px-16">
      <div className="flex flex-col items-center justify-start">
            {loading && (
              <div className="signin-loader-wrapper">
                <ChefLoader text="" />
              </div>
            )}

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

export default function PaymentSuccess() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-[url('/auth/signup.png')] bg-cover bg-no-repeat bg-center flex items-center justify-center px-4 md:px-16">
        <ChefLoader text="" />
      </div>
    }>
      <PaymentSuccessContent />
    </Suspense>
  );
}
