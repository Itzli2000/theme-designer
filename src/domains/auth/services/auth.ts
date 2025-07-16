import httpClient from "@shared/services/http";
import type { RegisterFormData } from "../stores/types";
import type { LoginFormData, LoginResponse, RegisterResponse } from "./types/auth.types";

const login = async ({
  email,
  password,
}: LoginFormData): Promise<LoginResponse> => {
  const response = await httpClient.post<LoginResponse>("/auth/login", {
    email,
    password,
  });
  return response;
};

const logout = async () => {
  const response = await httpClient.post("/auth/logout");
  return response;
};

const register = async ({
  email,
  password,
  firstName,
  lastName,
}: RegisterFormData): Promise<RegisterResponse> => {
  const response = await httpClient.post<RegisterResponse>("/auth/register", {
    email,
    password,
    firstName,
    lastName,
  });
  return response;
};

const isTokenValid = (token: string): boolean => {
  try {
    const parts = token.split(".");
    if (parts.length !== 3) return false;

    const payload = JSON.parse(atob(parts[1]));
    const now = Math.floor(Date.now() / 1000);

    return payload.exp && payload.exp > now;
  } catch {
    return false;
  }
};

export const AUTH_SERVICE = {
  login,
  logout,
  register,
  isTokenValid,
};
