import { create } from "zustand";
import { AUTH_SERVICE } from "../services/auth";
import { registerInitialFormData, registerInitialState } from "./constants";
import type { RegisterFormData, RegisterStore } from "./types";

export const useRegisterStore = create<RegisterStore>((set, get) => ({
  ...registerInitialState,

  register: async (formData: RegisterFormData) => {
    set({ isLoading: true, error: null, success: false });

    try {
      const response = await AUTH_SERVICE.register(formData);
      set({
        isLoading: false,
        success: true,
        error: null,
      });
      return response;
    } catch (error) {
      set({
        isLoading: false,
        error: error instanceof Error ? error.message : "Registration failed",
        success: false,
      });
      throw error instanceof Error ? error : new Error("Registration failed");
    }
  },

  updateFormData: (field: keyof RegisterFormData, value: string) => {
    const { formData } = get();
    set({
      formData: {
        ...formData,
        [field]: value,
      },
    });
  },

  resetForm: () => {
    set({
      formData: registerInitialFormData,
      error: null,
      success: false,
    });
  },

  clearError: () => {
    set({ error: null });
  },

  clearSuccess: () => {
    set({ success: false });
  },

  setLoading: (loading: boolean) => {
    set({ isLoading: loading });
  },

  setError: (error: string) => {
    set({ error });
  },

  setSuccess: (success: boolean) => {
    set({ success });
  },
}));
