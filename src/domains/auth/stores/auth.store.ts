import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { authInitialState } from './constants';
import type { AuthStore, User } from './types';

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      ...authInitialState,

      login: async (email: string, password: string) => {
        set({ isLoading: true, error: null });
        
        try {
          // TODO: Replace with actual API call
          const mockUser: User = {
            email,
            firstName: 'John',
            lastName: 'Doe',
            password,
          };
          
          const mockToken = 'mock-jwt-token';
          
          set({
            user: mockUser,
            token: mockToken,
            isAuthenticated: true,
            isLoading: false,
            error: null,
          });
        } catch (error) {
          set({
            isLoading: false,
            error: error instanceof Error ? error.message : 'Login failed',
          });
        }
      },

      logout: () => {
        set({
          user: null,
          token: null,
          isAuthenticated: false,
          error: null,
        });
      },

      clearError: () => {
        set({ error: null });
      },

      setUser: (user: User) => {
        set({ 
          user,
          isAuthenticated: true,
        });
      },

      setToken: (token: string) => {
        set({ token });
      },

      setLoading: (loading: boolean) => {
        set({ isLoading: loading });
      },

      setError: (error: string) => {
        set({ error });
      },
    }),
    {
      name: 'auth-store',
      partialize: (state) => ({
        user: state.user,
        token: state.token,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);