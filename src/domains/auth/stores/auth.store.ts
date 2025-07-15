import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { authInitialState } from './constants';
import type { AuthStore, User } from './types';

export const useAuthStore = create<AuthStore>()(
  persist(
    (set, get) => ({
      ...authInitialState,

      login: async (email: string, password: string) => {
        set({ isLoading: true, error: null });
        
        try {
          // TODO: Replace with actual API call
          const mockUser: User = {
            id: '1',
            email,
            name: 'John Doe',
            avatar: 'https://via.placeholder.com/150',
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
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