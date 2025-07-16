import httpClient from "@shared/services/http";
import type { Theme } from "../store/types";

const getThemes = async (): Promise<Theme[]> => {
  const response = await httpClient.get("/themes");
  return response.data as Theme[];
};

const createTheme = async (
  theme: Omit<Theme, "id" | "createdAt" | "updatedAt" | "userId">
): Promise<Theme> => {
  const response = await httpClient.post("/themes", theme);
  return response.data as Theme;
};

const updateTheme = async (
  id: string,
  theme: Partial<Theme>
): Promise<Theme> => {
  const response = await httpClient.put(`/themes/${id}`, theme);
  return response.data as Theme;
};

const deleteTheme = async (id: string): Promise<void> => {
  await httpClient.delete(`/themes/${id}`);
};

export const DASHBOARD_SERVICE = {
  getThemes,
  createTheme,
  updateTheme,
  deleteTheme,
};
