import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { User as AuthUser } from '@/types/auth/auth.types';
import { tokenService } from '@/lib/cookies';
import { jwtService } from '@/lib/jwt'; 
export type User = AuthUser;

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  token: string | null;
  login: (loginData: any) => void;
  logout: () => void;
  register: (user: User) => void;
  updateUser: (user: User) => void;
  initializeAuth: () => void;
  checkTokenExpiration: () => boolean;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      isAuthenticated: false,
      token: null,
      
      login: (loginResponse) => {
        // handle rta del back a nuestro tipo User 
        const backendUser = loginResponse;
        const token = backendUser.token;
        
        // Transformacion a formato propio del front
        const user = {
          email: backendUser.email,
          name: backendUser.name,
          token: backendUser.token,
          premium: backendUser.plan?.description === "Pro",
          plan: backendUser.plan,
          preferences: {
            cook_level: backendUser.preferences?.cook_level?.id,
            diet: backendUser.preferences?.diet?.id,
            dietaryRestrictions: backendUser.dietary_needs?.map((dietaryNeed: any) => dietaryNeed.id) || [],
            allergies: backendUser.allergies?.map((allergy: any) => allergy.id) || [],
            favourite_cuisines: backendUser.preferences?.favourite_cuisines,
          }
        }; 
        
        // traer usePreferencesStore con TODAS las opciones usando getters
        if (typeof window !== 'undefined') {
          const { usePreferencesStore } = require('./usePreferencesStore');
          const { getCookingLevels, getDiet, getAllergy, getDietaryNeed } = require('@/services/getter.service');
          
          // Llamar a los getters para obtener todas las opciones disponibles
          Promise.all([
            getCookingLevels(),
            getDiet(),
            getAllergy(),
            getDietaryNeed()
          ]).then(([cookingLevels, diets, allergies, dietaryNeeds]) => {
            const preferencesStore = usePreferencesStore.getState();
            preferencesStore.setCookingLevelOptions(cookingLevels);
            preferencesStore.setDietOptions(diets);
            preferencesStore.setAllergyOptions(allergies);
            preferencesStore.setDietaryNeedOptions(dietaryNeeds);
            preferencesStore.setIsLoaded(true);
          }).catch(error => {
          });
        }
        
        // Validar token antes de guardarlo
        if (!token || jwtService.isExpired(token)) {
          throw new Error('Token inválido o expirado');
        }

        tokenService.setToken(token);
        const decodedToken = jwtService.decode(token); 
        
        set({ 
          user, 
          token, 
          isAuthenticated: true 
        });
      },
      
      logout: () => {
        tokenService.removeToken();
        set({ 
          user: null, 
          token: null, 
          isAuthenticated: false 
        });
      },
      
      register: (user) => {
        set({ user, isAuthenticated: true });
      },
      
      updateUser: (user) => {
        set({ user });
      },
      
      initializeAuth: () => {
        const token = tokenService.getToken();
        const currentState = get();
        if (token) {
          if (!jwtService.isExpired(token)) {
            const decodedToken = jwtService.decode(token);            
            // Si tenemos token válido pero no hay user data, hay inconsistencia
            if (!currentState.user) {
              set({ 
                user: null, 
                token: null, 
                isAuthenticated: false 
              });
              return;
            }
            
            // Todo consistente - restaurar sesión completa
            set({ 
              token, 
              isAuthenticated: true 
              // user ya está cargado desde persist
            });
          } else { 
            tokenService.removeToken();
            set({ 
              user: null, 
              token: null, 
              isAuthenticated: false 
            });
          }
        } else {
          set({ 
            user: null, 
            token: null, 
            isAuthenticated: false 
          });
        }
      },
      
      checkTokenExpiration: (): boolean => {
        const token = get().token || tokenService.getToken();
        
        if (!token) return false;
        
        if (jwtService.isExpired(token)) {
          get().logout();
          return false;
        }
        
        return true;
      }
    }),
    {
      name: 'auth-storage',
      // Persistir solo datos del usuario, no el token (está en cookies)
      partialize: (state) => ({ 
        user: state.user,
        // No persistir token ni isAuthenticated, se manejan desde cookies
      }),
    }
  )
);

// Escuchar evento de logout desde interceptor
if (typeof window !== 'undefined') {
  window.addEventListener('auth:logout', () => {
    useAuthStore.getState().logout();
  });
}