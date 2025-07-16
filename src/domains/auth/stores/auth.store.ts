import { create } from "zustand";
import { persist } from "zustand/middleware";
import { authInitialState } from "./constants";
import type { AuthStore, User } from "./types";
import { AUTH_SERVICE } from "../services/auth";
import { AxiosError } from "axios";
import httpClient from "@shared/services/http";

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      ...authInitialState,

      login: async (email: string, password: string) => {
        set({ isLoading: true, error: null });

        try {
          const response = await AUTH_SERVICE.login({ email, password });

          httpClient.setAuthToken(response.access_token);

          set({
            user: response.user,
            token: response.access_token,
            isAuthenticated: true,
            isLoading: false,
            error: null,
          });
        } catch (error) {
          set({
            isLoading: false,
            error:
              error instanceof AxiosError
                ? error.response?.data.message
                : "Login failed",
          });
        }
      },

      logout: () => {
        httpClient.clearAuthToken();
        
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

      validateToken: () => {
        const state = useAuthStore.getState();
        if (!state.token || !state.isAuthenticated) {
          return false;
        }

        const isValid = AUTH_SERVICE.isTokenValid(state.token);
        
        if (!isValid) {
          useAuthStore.getState().logout()
        }

        return isValid;
      },
    }),
    {
      name: "auth-store",
      partialize: (state) => ({
        user: state.user,
        token: state.token,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);
