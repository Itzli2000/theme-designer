import { create } from "zustand";
import { registerInitialFormData, registerInitialState } from "./constants";
import type { RegisterFormData, RegisterStore } from "./types";

export const useRegisterStore = create<RegisterStore>((set, get) => ({
  ...registerInitialState,

  register: async (formData: RegisterFormData) => {
    set({ isLoading: true, error: null, success: false });

    try {
      // Validate form data
      const validation = validateRegistrationForm(formData);
      if (!validation.isValid) {
        throw new Error(validation.error);
      }

      // TODO: Replace with actual API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      set({
        isLoading: false,
        success: true,
        error: null,
      });
    } catch (error) {
      set({
        isLoading: false,
        error: error instanceof Error ? error.message : "Registration failed",
        success: false,
      });
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

// Validation helper function
function validateRegistrationForm(formData: RegisterFormData): {
  isValid: boolean;
  error?: string;
} {
  const { name, email, password, confirmPassword } = formData;

  if (!name.trim()) {
    return { isValid: false, error: "Name is required" };
  }

  if (!email.trim()) {
    return { isValid: false, error: "Email is required" };
  }

  if (!isValidEmail(email)) {
    return { isValid: false, error: "Please enter a valid email address" };
  }

  if (!password) {
    return { isValid: false, error: "Password is required" };
  }

  if (password.length < 6) {
    return {
      isValid: false,
      error: "Password must be at least 6 characters long",
    };
  }

  if (password !== confirmPassword) {
    return { isValid: false, error: "Passwords do not match" };
  }

  return { isValid: true };
}

// Email validation helper
function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}
