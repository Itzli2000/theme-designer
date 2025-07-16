import httpClient from "@shared/services/http";
import type { User } from "../stores/types";

const login = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}): Promise<{ user: User; access_token: string }> => {
  const response = await httpClient.post("/auth/login", { email, password });
  return response.data as { user: User; access_token: string };
};

const logout = async () => {
  const response = await httpClient.post("/auth/logout");
  return response.data;
};

const isTokenValid = (token: string): boolean => {
  try {
    const parts = token.split('.');
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
  isTokenValid,
};
