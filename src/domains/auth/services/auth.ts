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

export const AUTH_SERVICE = {
  login,
  logout,
};
