import type { RegisterFormData, RegisterState } from "../types";

export const registerInitialFormData: RegisterFormData = {
  name: "",
  email: "",
  password: "",
  confirmPassword: "",
};

export const registerInitialState: RegisterState = {
  isLoading: false,
  error: null,
  success: false,
  formData: registerInitialFormData,
};
