'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/useAuthStore';
import PreferencesContainer from '@/components/shared/preferences/PreferencesContainer';
import { UserPreferences } from '@/types/auth/auth.types';

export default function ProfilePreferencesPage() {
  const router = useRouter();
  const user = useAuthStore(state => state.user);

  const handleSavePreferences = async (preferences: UserPreferences) => {
    try {
      //TODO: service de preferencias 
      router.push('/profile');
    } catch (error) {
      console.error('Error al guardar preferencias:', error);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <PreferencesContainer
        initialPreferences={user?.preferences}
        onComplete={handleSavePreferences}
        title="Editar preferencias"
        submitButtonText="Guardar cambios"
      />
    </div>
  );
} 