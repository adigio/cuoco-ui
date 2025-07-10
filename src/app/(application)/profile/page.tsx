"use client";
import BackgroundLayers from "@/components/shared/BackgroundLayers";
import { useAuthStore } from "@/store/useAuthStore";
import ContainerShadow from "@/components/shared/containers/ContainerShadow";
import Button from "@/components/shared/form/Button";
import { recoverPassword } from "@/services/recover.password";
import { updateProfile } from "@/services/auth.service";
import { useEffect, useState } from "react";
import Link from "next/link";
import PreferencesModal from "@/components/shared/modal/PreferencesModal";
import PreferencesDisplay from "@/components/shared/preferences/PreferencesDisplay";
import SubscriptionModal from "@/components/shared/modal/SubscriptionModal";
import { UserPreferences } from "@/types/auth/auth.types";

export default function Profile() {
  const { user, updateUser } = useAuthStore();
  const email = user?.email ?? "";
  const isPremium = user?.premium ?? false;
  const premiumLabel = isPremium ? "PREMIUM" : "FREE";
  const startDate = "10/05/2024"; // ajustar si no viene

  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const [message, setMessage] = useState("");
  const [editMode, setEditMode] = useState(false);
  const [preferences, setPreferences] = useState<UserPreferences | undefined>(user?.preferences);
  const [isSubscriptionModalOpen, setIsSubscriptionModalOpen] = useState(false);

  useEffect(() => {
    if (user?.preferences) {
      setPreferences(user.preferences);
    }
  }, [user?.preferences]);

  const handleOpenSubscriptionModal = () => {
    setIsSubscriptionModalOpen(true);
  };

  const handleSavePreferences = async (newPreferences: UserPreferences) => {
    try {
      const userData = {
        name: user?.name || "string",
        plan_id: user?.plan?.id || 0,
        cook_level_id: newPreferences.cook_level || 0,
        diet_id: newPreferences.diet || 0,
        dietary_needs: newPreferences.dietaryRestrictions || [],
        allergies: newPreferences.allergies || []
      };

      const updatedUser = await updateProfile(userData);
      
      setPreferences(newPreferences);
      
      if (user) {
        updateUser({
          ...user,
          preferences: newPreferences
        });
      }
      
      setEditMode(false);
    } catch (error) {
    }
  };

  const handleResetPassword = async () => {
    setLoading(true);

    try {
      const result = await recoverPassword(email); 
      setMessage(result.message);
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
                  <PreferencesDisplay
                    preferences={preferences}
                    onEdit={() => setEditMode(true)}
                  />
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
                  </div>
                )}
              </div>
            </div>

            <div className="mt-8">
              <Link
                href="/home"
                className="inline-block bg-[#f37b6a] text-white px-6 py-2 rounded hover:bg-[#e36455] transition"
              >
                Ir al Home
              </Link>
            </div>
          </div>

          <PreferencesModal
            isOpen={editMode}
            onClose={() => setEditMode(false)}
            onSave={handleSavePreferences}
            initialPreferences={preferences}
          />

          <SubscriptionModal
            isOpen={isSubscriptionModalOpen}
            onClose={() => setIsSubscriptionModalOpen(false)}
            title=""
          />
        </main>
      </ContainerShadow>
    </>
  );
}
