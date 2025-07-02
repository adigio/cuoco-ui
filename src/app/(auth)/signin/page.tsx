"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import "./signin.css";
import Button from "@/components/shared/form/Button";
import ChefLoader from "@/components/shared/loaders/ChefLoader";
import Input from "@/components/shared/form/Input";
import { useAuthStore } from "@/store/useAuthStore";
import { login } from "@/services/auth.service";
import NotificationModal from "@/components/shared/modal/NotificationModal";
import { useNotification } from "@/hooks/useNotification";

export default function SignIn() {
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
    email: "",
    password: "",
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

      const response = await login(formData.email, formData.password);
 
      useAuthStore.getState().login(response.data.user);
      
      showSuccess(
        "¡Bienvenido de vuelta!", 
        "Redirigiendo a tu dashboard..."
      );
      
      setTimeout(() => {
        router.push("/home");
      }, 2000);
      
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
          <ChefLoader text="Iniciando sesión" />
        </div>
      )}

      <div className="min-h-screen bg-[url('/auth/signin-mobile.png')] md:bg-[url('/auth/signin.png')] bg-cover bg-no-repeat bg-center flex items-center justify-center md:justify-end px-4 md:px-16">
        <div className="bg-white/90 rounded-3xl p-6 w-full md:max-w-md space-y-4 shadow-xl mx-4 md:mx-0">
          <h2 className="text-2xl font-semibold mb-6 text-center">
            Bienvenido de nuevo
          </h2>

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

            <Input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              label="Contraseña"
              placeholder="*********************"
              required
              disabled={loading}
            />

            <Link
              href="#"
              className="text-sm text-purple-600 hover:underline self-end"
            >
              ¿Olvidaste tu contraseña?
            </Link>

            <Button
              type="submit"
              variant="primary"
              fullWidth
              disabled={loading}
            >
              Iniciar Sesión
            </Button>
          </form>

          <p className="mt-4 text-center text-sm">
            ¿No tienes cuenta?{" "}
            <Link href="/signup" className="text-purple-600 hover:underline">
              Registrate
            </Link>
          </p>

          <div className="mt-6 flex flex-col gap-3">
            <Button
              variant="google"
              fullWidth
              onClick={() => console.log("Google login")}
              size={"sm"}
              disabled={true}
            >
              Iniciar sesión con Google
            </Button>

            <Button
              variant="facebook"
              fullWidth
              size={"sm"}
              onClick={() => console.log("Facebook login")}
              disabled={true}
            >
              Iniciar sesión con Facebook
            </Button>
          </div>
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
