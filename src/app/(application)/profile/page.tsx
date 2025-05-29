"use client";
import BackgroundLayers from "@/components/shared/BackgroundLayers";
import { useAuthStore } from "@/store/useAuthStore";
import ContainerShadow from "@/components/shared/containers/ContainerShadow";
import Button from "@/components/shared/form/Button";
import { recoverPassword } from "@/services/recoverPassword";
import { useState } from "react";
import Link from "next/link";
import ModalPreferences from "@/components/shared/modal/ModalPreferences";
import FoodPreferences from "@/components/profile/FoodPreferences";
import SubscriptionModal from "@/components/shared/modal/SubscriptionModal";
export default function Profile() {
  const { user } = useAuthStore();
  const email = user?.email ?? "";
  const isPremium = user?.premium ?? false;
  const premiumLabel = isPremium ? "PREMIUM" : "FREE";
  const startDate = "10/05/2024"; // ajustar si no viene

  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const [message, setMessage] = useState("");
  const [editMode, setEditMode] = useState(false);
  const [subStep, setSubStep] = useState(1);
  const [level, setLevel] = useState("Medio");
  const [diet, setDiet] = useState("Vegetariano");
  const [foodNeeds, setFoodNeeds] = useState([
    "Sin lactosa",
    "Alta en proteínas",
  ]);
  const [allergies, setAllergies] = useState(["Frutos secos", "Soja"]);
  const [isSubscriptionModalOpen, setIsSubscriptionModalOpen] = useState(false);  

  const handleOpenSubscriptionModal = () => {
    setIsSubscriptionModalOpen(true);
  };

  const handleResetPassword = async () => {
    setLoading(true);

    try {
      const result = await recoverPassword(email);
      console.log(result);
      setMessage(result.message); // guardás el mensaje del backend
      setDone(true);
    } catch (error: any) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <BackgroundLayers />
      <div className="w-full border-b-4 border-purple-400 mb-6"></div>
      <ContainerShadow>
        <main className="flex-1 relative">
          <div className="flex flex-col items-center justify-center min-h-[80vh] px-4 py-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">
              Perfil & Preferencias
            </h2>
            <div className="flex flex-col md:flex-row gap-10 w-full max-w-5xl">
              {/* Panel izquierdo */}
              <div className="bg-white rounded-2xl shadow-md p-6 flex-1 min-w-[280px]">
                <h2 className="text-2xl font-semibold text-gray-800 mb-6">
                  Perfil{" "}
                </h2>
                <div className="space-y-2 text-base">
                  <p>
                    <span className="font-bold text-gray-700">Email:</span>{" "}
                    <span className="text-[#F37B6A]">{email}</span>
                  </p>
                  <p>
                    <span className="font-bold text-gray-700">Contraseña:</span>{" "}
                    **********
                  </p>
                </div>
                <Button
                  type="button"
                  onClick={handleResetPassword}
                  variant={done ? "success" : "primary"}
                  disabled={loading || done}
                >
                  {loading
                    ? "Enviando..."
                    : done
                    ? message || "Reestablece tu contraseña. Revisá tu mail"
                    : "Reestablecer Contraseña"}
                </Button>

                <div className="mt-6 bg-[#FCD5CE] px-4 py-3 rounded-lg">
                  <p className="font-bold text-gray-700">
                    Plan: <span className="uppercase">{premiumLabel}</span>
                  </p>
                  <p className="font-bold text-gray-700">
                    Desde: <span>{startDate}</span>
                  </p>
                </div>
              </div>

              {/* Panel derecho */}
              <div className="bg-white rounded-2xl shadow-md p-6 flex-1 min-w-[280px]">
                <h3 className="text-xl font-semibold text-gray-800 mb-4">
                  Preferencias alimentarias
                </h3>

                {isPremium ? (
                  <div className="space-y-2 text-base">
                    <p>
                      <span className="font-bold text-gray-700">Dieta:</span>{" "}
                      <span className="text-[#F37B6A]">Vegetariana</span>
                    </p>
                    <p>
                      <span className="font-bold text-gray-700">
                        Nivel de cocina:
                      </span>{" "}
                      <span className="text-[#F37B6A]">Casera</span>
                    </p>
                    <p>
                      <span className="font-bold text-gray-700">
                        Restricciones:
                      </span>{" "}
                      <span className="text-[#F37B6A]">Sin lactosa</span>
                    </p>
                    <p>
                      <span className="font-bold text-gray-700">Alergias:</span>{" "}
                      <span className="text-[#F37B6A]">Maní, Pescado</span>
                    </p>

                    <button
                      className="mt-4 px-4 py-2 bg-gray-300 rounded shadow-sm text-sm font-semibold"
                      onClick={() => setEditMode(true)}
                    >
                      Corregir
                    </button>
                  </div>
                ) : (
                  <div className="bg-[#FFD8CF] p-6 rounded-xl text-center">
                    <div className="text-4xl mb-4">🔒</div>
                    <p className="mb-4 text-gray-800 font-medium">
                      Para guardar preferencias detalladas, actualizá tu plan
                    </p>
                    <Button
                      variant="primary"
                      size="md"
                      onClick={handleOpenSubscriptionModal}
                    >
                      Se Premium
                    </Button>

                    <SubscriptionModal
                      isOpen={isSubscriptionModalOpen}
                      onClose={() => setIsSubscriptionModalOpen(false)}
                    />
                  </div>
                )}
              </div>
            </div>

            {/* Botón HOME opcional */}
            <div className="mt-8">
              <Link
                href="/home"
                className="inline-block bg-[#f37b6a] text-white px-6 py-2 rounded hover:bg-[#e36455] transition"
              >
                Ir al Home
              </Link>
            </div>
          </div>
          <ModalPreferences
            isOpen={editMode}
            onClose={() => setEditMode(false)}
          >
            <FoodPreferences
              level={level}
              setLevel={setLevel}
              diet={diet}
              setDiet={setDiet}
              foodNeeds={foodNeeds}
              setFoodNeeds={setFoodNeeds}
              allergies={allergies}
              setAllergies={setAllergies}
              subStep={1} // Podés controlar esto con botones también
            />
            
            <div className="mt-4 flex justify-end gap-2">
              <button
                onClick={() => setEditMode(false)}
                className="px-4 py-2 bg-gray-300 rounded"
              >
                Cancelar
              </button>
              <button
                onClick={() => {
                  // Acá podés hacer tu POST/PUT con Axios
                  console.log({ level, diet, foodNeeds, allergies });
                  setEditMode(false);
                }}
                className="px-4 py-2 bg-green-500 text-white rounded"
              >
                Guardar
              </button>
            </div>
          </ModalPreferences>
        </main>
      </ContainerShadow>
    </>
  );
}
